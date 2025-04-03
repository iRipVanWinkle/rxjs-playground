import { Handle, NodeProps, Position } from "@xyflow/react";
import { Observable, tap } from "rxjs";
import { NodeHeader } from "./parts/NodeHeader";
import { NodeContent } from "./parts/NodeContent";
import { NodeFooter } from "./parts/NodeFooter";
import { NodeContainer } from "./parts/NodeContainer";

export function TapNode(props: NodeProps) {
  const { id, data, type } = props;

  return (
    <NodeContainer>
      <NodeHeader id={id} name="tap()"></NodeHeader>

      <NodeContent value={data?.value}></NodeContent>

      <NodeFooter id={id} type={type}></NodeFooter>

      <Handle id={Position.Top} type="target" position={Position.Top} ></Handle>
      <Handle id={Position.Bottom} type="source" position={Position.Bottom} ></Handle>
    </NodeContainer>
  );
}

function handler(observable: Observable<unknown>): Observable<unknown> {
  return observable.pipe(
    tap((value) => {
      // console.log('Tap Node Value:', value);
    })
  );
}
const key = "tap";
const title = "tap()";
const description = "Allows you to perform side effects for notifications from the source observable. It can be used to log values, perform actions, or trigger other side effects without modifying the original observable stream.";

Object.assign(TapNode, {
  key,
  title,
  description,
  handler,
});