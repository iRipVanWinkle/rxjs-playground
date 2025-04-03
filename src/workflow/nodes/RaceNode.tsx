import { Handle, NodeProps, Position } from "@xyflow/react";
import { Observable, race } from "rxjs";
import { NodeHeader } from "./parts/NodeHeader";
import { NodeContent } from "./parts/NodeContent";
import { NodeFooter } from "./parts/NodeFooter";
import { NodeContainer } from "./parts/NodeContainer";

export function RaceNode(props: NodeProps) {
  const { id, data, type } = props;

  return (
    <NodeContainer>

      <NodeHeader id={id} name="race()"></NodeHeader>

      <NodeContent value={data?.value}></NodeContent>

      <NodeFooter id={id} type={type}></NodeFooter>

      <Handle type="target" position={Position.Left}></Handle>
      <Handle type="source" position={Position.Bottom}></Handle>
    </NodeContainer>
  );

}

function handler(observables: Observable<unknown>[]): Observable<unknown> {
  return race(observables);
}
const key = "race";
const title = "race()";
const description = "";

Object.assign(RaceNode, {
  key,
  title,
  description,
  handler,
});

