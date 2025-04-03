import clsx from "clsx";
import { applyNodeChanges, Edge, Handle, Node, NodeProps, Position, useNodeId, useReactFlow } from "@xyflow/react";

import styles from './Node.module.css';
import { delay, finalize, find, fromEvent, Observable, Observer, tap, timer } from "rxjs";
import { nodeTypes } from "../Workflow";
import { NodeHeader } from "./parts/NodeHeader";
import { NodeContent } from "./parts/NodeContent";
import { NodeFooter } from "./parts/NodeFooter";
import { NodeContainer } from "./parts/NodeContainer";

const buildReverseEdgeMap = (edges: Edge[]) => {
  const reverseMap = {} as Record<string, { pipes: string[], params: string[] }>;
  for (const edge of edges) {
    if (!reverseMap[edge.target]) {
      reverseMap[edge.target] = {
        pipes: [],
        params: []
      };
    }

    const field = edge.type === 'paramEdge' ? 'params' : 'pipes'
    reverseMap[edge.target][field].push(edge.source);
  }
  return reverseMap;
};

const findNodeById = (id: string, nodes: Node[]) => nodes.find(node => node.id === id);

// Recursive function to construct RxJS pipeline
const constructRxJsPipeline = (nodeId: string, reverseEdgeMap: Record<string, { pipes: string[], params: string[] }>, nodes: Node[], updateNode: any) => {
  const node = findNodeById(nodeId, nodes);

  if (!node) {
    throw new Error(`Node with id ${nodeId} not found`);
  }

  // If the node is a "source" node (no reverse edges), start the observable
  if (!reverseEdgeMap[nodeId] || (reverseEdgeMap[nodeId].params.length === 0 && reverseEdgeMap[nodeId].pipes.length === 0)) {
    if (node.type && nodeTypes[node.type as string]) {
      return nodeTypes[node.type as string].handler().pipe(
        finalize(() => updateNode(nodeId, { data: { status: 'completed' } })),
        tap((value) => updateNode(nodeId, { data: { value, status: 'active' } })));
    }
    throw new Error(`Unsupported source operator: ${node.type}`);
  }

  // If the node has dependencies, recursively construct their observables
  const pipes = reverseEdgeMap[nodeId].pipes.map(sourceId =>
    constructRxJsPipeline(sourceId, reverseEdgeMap, nodes, updateNode)
  );
  const params = reverseEdgeMap[nodeId].params.map(sourceId =>
    constructRxJsPipeline(sourceId, reverseEdgeMap, nodes, updateNode)
  );

  // Combine child sources based on the operator
  if (node.type && nodeTypes[node.type as string]) {
    if (node.type === 'subscriberNode') {
      return nodeTypes[node.type as string].handler(pipes[0], {
        next: (value) => updateNode(nodeId, { data: { value, status: 'active' } }),
        complete: () => updateNode(nodeId, { data: { status: 'completed' } })
      });
    } else {
      return nodeTypes[node.type as string].handler(pipes.length === 1 ? pipes[0] : pipes, params.length === 1 ? params[0] : params).pipe(
        finalize(() => updateNode(nodeId, { data: { status: 'completed' } })),
        tap((value) => updateNode(nodeId, { data: { value, status: 'active' } }))
      );
    }
  }

  throw new Error(`Unsupported operator: ${node.type}`);
};


export function SubscriberNode(props: NodeProps) {
  const { id, selected, data, type } = props;

  const { getNodes, getEdges, setNodes, updateNode, getNode } = useReactFlow();

  const run = () => {
    const reverseEdgeMap = buildReverseEdgeMap(getEdges());
    // const node = findNodeById(id, getNodes());

    constructRxJsPipeline(id, reverseEdgeMap, getNodes(), updateNode);
    // console.log(node, reverseEdgeMap);
  }

  return (
    <NodeContainer>
      <NodeHeader id={id} name="subscribe()" type={type} onRun={run}></NodeHeader>
      <NodeContent value={data?.value}></NodeContent>
      <NodeFooter id={id} type={type}></NodeFooter>
      <Handle type="target" position={Position.Top} ></Handle>
    </NodeContainer>
  );
}

SubscriberNode.handler = <T = unknown>(observable: Observable<T>, observerOrNext?: Partial<Observer<T>> | ((value: T) => void)) => {
  observable.subscribe(observerOrNext);
}
