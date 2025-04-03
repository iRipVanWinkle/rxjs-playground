import { Handle, NodeProps, Position } from "@xyflow/react";
import { combineLatest, Observable } from "rxjs";
import { NodeHeader } from "./parts/NodeHeader";
import { NodeContent } from "./parts/NodeContent";
import { NodeFooter } from "./parts/NodeFooter";
import { NodeContainer } from "./parts/NodeContainer";

export function CombineLatestNode(props: NodeProps) {
  const { id, data, type } = props;

  return (
    <NodeContainer>

      <NodeHeader id={id} name="combineLatest()"></NodeHeader>

      <NodeContent value={data?.value}></NodeContent>

      <NodeFooter id={id} type={type}></NodeFooter>

      <Handle type="target" position={Position.Left}></Handle>
      <Handle type="source" position={Position.Bottom}></Handle>
    </NodeContainer>
  );

}

function handler (observables: Observable<unknown>[], params: Observable<unknown>[]): Observable<unknown> {
  return combineLatest(params);
}
const key = "combineLatest";
const title = "combineLatest()";
const description = "Combines multiple observables into one by emitting an array of their latest values whenever any of the source observables emit a value.";

Object.assign(CombineLatestNode, {
  key,
  title,
  description,
  handler,
});
