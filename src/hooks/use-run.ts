import { Edge, useNodeId, useReactFlow } from "@xyflow/react";
import { nodeTypes, Operations } from "../workflow/nodes";
import { finalize, Observable, tap } from "rxjs";
import { useCallback } from "react";
import Subscriber from "@/operations/Subscriber";

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

    const field = edge.type === 'paramEdge' ? 'params' : 'pipes'
    reverseMap[edge.target][field].push(edge.source);
  }
  return reverseMap;
};

export function useRun() {
  const { getEdges, updateNode, getNode } = useReactFlow();
  const id = useNodeId();

  console.info(nodeTypes);

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
      return operation({source: undefined, params: undefined, config: {}}).pipe(
        finalize(() => {
          const node = getNode(nodeId)!;
          updateNode(nodeId, { data: { ...node.data, status: 'completed' } });
        }),
        tap((value) => updateNode(nodeId, { data: { value, status: 'active' } }))
      );
    }

    // If the node has dependencies, recursively construct their observables
    const pipes = reverseEdgeMap[nodeId].pipes.map(sourceId => constructRxJsPipeline(sourceId, reverseEdgeMap));
    const params = reverseEdgeMap[nodeId].params.map(sourceId => constructRxJsPipeline(sourceId, reverseEdgeMap));

    console.info(nodeTypes);
    // Combine child sources based on the operator
    if (node.type && nodeTypes[node.type as string]) {
      if (node.type === Subscriber.key) {
        return operation({
          source: pipes[0],
          params: undefined,
          config: {
            observerOrNext: {
              next: (value: unknown) => updateNode(nodeId, { data: { value, status: 'active' } }),
              complete: () => {
                const node = getNode(nodeId)!;
                updateNode(nodeId, { data: { ...node.data, status: 'completed' } })
              }
            }
          }
        });
      } else {
        return (operation({
          source: pipes.length === 1 ? pipes[0] : pipes,
          params: params.length === 1 ? params[0] : params,
          config: {}
        }) as Observable<unknown>).pipe(
          finalize(() => {
            const node = getNode(nodeId)!;
            updateNode(nodeId, { data: { ...node.data, status: 'completed' } })
          }),
          tap((value) => updateNode(nodeId, { data: { value, status: 'active' } }))
        );
      }
    }

    throw new Error(`Unsupported operator: ${node.type}`);
  }, [getNode, updateNode]);

  const run = useCallback(() => {
    const reverseEdgeMap = buildReverseEdgeMap(getEdges());
    constructRxJsPipeline(id!, reverseEdgeMap);
  }, [constructRxJsPipeline, getEdges, id]);

  return { run };

}
