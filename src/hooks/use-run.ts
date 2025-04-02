import { Edge, useNodeId, useReactFlow } from "@xyflow/react";
import { nodeTypes, Operations } from "../workflow/nodes";
import { finalize, Observable, Subscription, tap } from "rxjs";
import { useCallback, useRef } from "react";
import Subscriber from "@/operations/Subscriber";
import { useWorkContext } from "@/context/WorkContext";

type ReverseEdgeMapType = Record<string, { pipes: string[], params: string[] }>;

const buildReverseEdgeMap = (edges: Edge[]): ReverseEdgeMapType => {
  const reverseMap = {} as Record<string, { pipes: string[], params: string[] }>;
  for (const edge of edges) {
    if (!reverseMap[edge.target]) {
      reverseMap[edge.target] = {
        pipes: [],
        params: []
      };
    }

    const field = edge.type === 'param' ? 'params' : 'pipes'
    reverseMap[edge.target][field].push(edge.source);
  }
  return reverseMap;
};

export function useRun() {
  const { getEdges, getNode, updateNodeData } = useReactFlow();
  const { setRunning } = useWorkContext()
  const subscribeRef= useRef<Subscription>(null);
  const id = useNodeId();

  if (!id) {
    throw new Error(`useRun must be used within Node`);
  }

  const constructRxJsPipeline = useCallback((nodeId: string, reverseEdgeMap: ReverseEdgeMapType): Observable<unknown> => {
    const node = getNode(nodeId);

    if (!node) {
      throw new Error(`Node with id ${nodeId} not found`);
    }

    if (!node.type) {
      throw new Error(`Node does not have a type: ${nodeId}`);
    }

    const operation = Operations[node.type];

    if (!operation) {
      throw new Error(`Unsupported source operator: ${node.type}`);
    }

    // If the node is a "source" node (no reverse edges), start the observable
    if (!reverseEdgeMap[nodeId] || (reverseEdgeMap[nodeId].params.length === 0 && reverseEdgeMap[nodeId].pipes.length === 0)) {
      return operation.handler({source: undefined, params: undefined, config: node.data}).pipe(
        finalize(() => updateNodeData(nodeId, () => ({ status: 'completed' }))),
        tap((value) => updateNodeData(nodeId, () => ({ value, status: 'active' })))
      );
    }

    // If the node has dependencies, recursively construct their observables
    const pipes = reverseEdgeMap[nodeId].pipes.map(sourceId => constructRxJsPipeline(sourceId, reverseEdgeMap));
    const params = reverseEdgeMap[nodeId].params.map(sourceId => constructRxJsPipeline(sourceId, reverseEdgeMap));

    // Combine child sources based on the operator
    if (node.type && nodeTypes[node.type as string]) {
      if (node.type === Subscriber.key) {
        return operation.handler({
          source: pipes[0],
          params: undefined,
          config: {
            observerOrNext: {
              next: (value: unknown) => updateNodeData(nodeId, () => ({ value, status: 'active' })),
              complete: () => updateNodeData(nodeId, () => ({ status: 'completed' }))
            }
          }
        });
      } else {
        return (operation.handler({
          source: pipes.length === 1 ? pipes[0] : pipes,
          params: params.length === 1 ? params[0] : params,
          config: node.data
        }) as Observable<unknown>).pipe(
          finalize(() => updateNodeData(nodeId, () => ({ status: 'completed' }))),
          tap((value) => updateNodeData(nodeId, () => ({ value, status: 'active' })))
        );
      }
    }

    throw new Error(`Unsupported operator: ${node.type}`);
  }, [getNode, updateNodeData]);

  const run = useCallback(() => {
    setRunning(true);
    const reverseEdgeMap = buildReverseEdgeMap(getEdges());
    subscribeRef.current = constructRxJsPipeline(id, reverseEdgeMap) as unknown as Subscription;
  }, [constructRxJsPipeline, getEdges, id, setRunning]);

  const stop = useCallback(() => {
    setRunning(false);
    console.info(subscribeRef.current);
    if (subscribeRef.current) {
      subscribeRef.current.unsubscribe();
    }
  }, [setRunning]);

  return { run, stop };
}
