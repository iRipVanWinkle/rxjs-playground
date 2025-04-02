import clsx from "clsx";
import { Edge, Handle, Node, NodeProps, Position, useNodeId, useReactFlow } from "reactflow";

import styles from './Node.module.css';
import { fromEvent, Observable, timer } from "rxjs";
import { nodeTypes } from "../Workflow";

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
const constructRxJsPipeline = (nodeId: string, reverseEdgeMap: Record<string, string[]>, nodes: Node[]) => {
  const node = findNodeById(nodeId, nodes);

  if (!node) {
    throw new Error(`Node with id ${nodeId} not found`);
  }
  console.info(nodeTypes[node.type as string]);
  // If the node is a "source" node (no reverse edges), start the observable
  if (!reverseEdgeMap[nodeId] || reverseEdgeMap[nodeId].length === 0) {
    if (node.type && nodeTypes[node.type as string]) {
      return nodeTypes[node.type as string].handler();
    }
    throw new Error(`Unsupported source operator: ${node.type}`);
  }

  // If the node has dependencies, recursively construct their observables
  const sources = reverseEdgeMap[nodeId].map(sourceId =>
    constructRxJsPipeline(sourceId, reverseEdgeMap, nodes)
  );

  // Combine child sources based on the operator
  if (node.type && nodeTypes[node.type as string]) {
    return nodeTypes[node.type as string].handler(sources.length === 1 ? sources[0] : sources); 
  }

  throw new Error(`Unsupported operator: ${node.type}`);
};


export function SubscriberNode(props: NodeProps) {
  const { id, selected } = props;

  const { getNodes, getEdges } = useReactFlow();

  const run = () => {
    const reverseEdgeMap = buildReverseEdgeMap(getEdges());
    const node = findNodeById(id, getNodes());

    constructRxJsPipeline(id, reverseEdgeMap, getNodes());
    console.log(node, reverseEdgeMap);
  }

  const className = clsx(styles.node, {
    [styles.selected]: selected,
  });

  return (
    <div className={className}>
      <div>Subscriber Node {useNodeId()}</div>

      <button onClick={run}>Run</button>

      <Handle type="target" position={Position.Left} ></Handle>
    </div>
  );
}

SubscriberNode.handler = (observable: Observable<unknown>) => {
  observable.subscribe((value) => {
    console.log('Subscriber Node Value:', value);
  });
}
