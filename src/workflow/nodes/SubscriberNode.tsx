import clsx from "clsx";
import { applyNodeChanges, Edge, Handle, Node, NodeProps, Position, useNodeId, useReactFlow } from "@xyflow/react";

import styles from './Node.module.css';
import { delay, find, fromEvent, Observable, tap, timer } from "rxjs";
import { nodeTypes } from "../Workflow";
import { NodeHeader } from "./parts/NodeHeader";
import { NodeContent } from "./parts/NodeContent";
import { NodeFooter } from "./parts/NodeFooter";
import { NodeContainer } from "./parts/NodeContainer";

const buildReverseEdgeMap = (edges: Edge[]) => {
  const reverseMap = {} as Record<string, string[]>;
  for (const edge of edges) {
    if (!reverseMap[edge.target]) {
      reverseMap[edge.target] = [];
    }
    reverseMap[edge.target].push(edge.source);
  }
  return reverseMap;
};

const findNodeById = (id: string, nodes: Node[]) => nodes.find(node => node.id === id);

// Recursive function to construct RxJS pipeline
const constructRxJsPipeline = (nodeId: string, reverseEdgeMap: Record<string, string[]>, nodes: Node[], updateNode: any) => {
  const node = findNodeById(nodeId, nodes);

  if (!node) {
    throw new Error(`Node with id ${nodeId} not found`);
  }

  // If the node is a "source" node (no reverse edges), start the observable
  if (!reverseEdgeMap[nodeId] || reverseEdgeMap[nodeId].length === 0) {
    if (node.type && nodeTypes[node.type as string]) {
      return nodeTypes[node.type as string].handler().pipe(tap((value) => {
        updateNode(nodeId, { data: { value, active: true } });
      }));
    }
    throw new Error(`Unsupported source operator: ${node.type}`);
  }

  // If the node has dependencies, recursively construct their observables
  const sources = reverseEdgeMap[nodeId].map(sourceId =>
    constructRxJsPipeline(sourceId, reverseEdgeMap, nodes, updateNode)
  );

  // Combine child sources based on the operator
  if (node.type && nodeTypes[node.type as string]) {
    if (node.type === 'subscriberNode') {
      return nodeTypes[node.type as string].handler(sources[0], (value: any) => {
        updateNode(nodeId, { data: { value, active: true } });
      });
    } else {
      return nodeTypes[node.type as string].handler(sources.length === 1 ? sources[0] : sources).pipe(tap((value) => {
        console.info(node);
        updateNode(nodeId, { data: { value, active: true } });
      }));
    }
  }

  throw new Error(`Unsupported operator: ${node.type}`);
};


export function SubscriberNode(props: NodeProps) {
  const { id, selected, data, type } = props;

  const { getNodes, getEdges, setNodes, updateNode } = useReactFlow();

  const run = () => {
    const reverseEdgeMap = buildReverseEdgeMap(getEdges());
    const node = findNodeById(id, getNodes());

    constructRxJsPipeline(id, reverseEdgeMap, getNodes(), updateNode);
    console.log(node, reverseEdgeMap);
  }

  return (
    <NodeContainer>
      <NodeHeader id={id} name="subscribe()"></NodeHeader>
      <NodeContent value={data?.value}></NodeContent>
      <NodeFooter id={id} type={type} onRun={run}></NodeFooter>
      <Handle type="target" position={Position.Top} ></Handle>
    </NodeContainer>
  );
}

SubscriberNode.handler = (observable: Observable<unknown>, next: (val: unknown) => void) => {
  observable.subscribe((value) => {
    next(value)
  });
}
