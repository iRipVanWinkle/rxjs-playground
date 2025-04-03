import { Handle, NodeProps, Position } from "@xyflow/react";
import { Observable, zip } from "rxjs";
import { NodeHeader } from "./parts/NodeHeader";
import { NodeContent } from "./parts/NodeContent";
import { NodeFooter } from "./parts/NodeFooter";
import { NodeContainer } from "./parts/NodeContainer";

export function ZipNode(props: NodeProps) {
  const { id, data, type } = props;

  return (
    <NodeContainer>

      <NodeHeader id={id} name="zip()"></NodeHeader>

      <NodeContent value={data?.value}></NodeContent>

      <NodeFooter id={id} type={type}></NodeFooter>

      <Handle type="target" position={Position.Left}></Handle>
      <Handle type="source" position={Position.Bottom}></Handle>
    </NodeContainer>
  );
}


function handler(observables: Observable<unknown>[]): Observable<unknown> {
  return zip(observables);
}
const key = "zip";
const title = "zip()";
const description = "Combines multiple observables into one by emitting an array of their latest values.";

Object.assign(ZipNode, {
  key,
  title,
  description,
  handler,
});
