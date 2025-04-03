import { Handle, NodeProps, Position } from "@xyflow/react";
import { Observable, takeUntil, tap, zip } from "rxjs";
import { NodeHeader } from "./parts/NodeHeader";
import { NodeContent } from "./parts/NodeContent";
import { NodeFooter } from "./parts/NodeFooter";
import { NodeContainer } from "./parts/NodeContainer";
import { nodeTypes } from "@/config/node-types";

export function TakeUntilNode(props: NodeProps) {
  const { id, data, type } = props;

  return (
    <NodeContainer>

      <NodeHeader id={id} name="takeUntil()"></NodeHeader>

      <NodeContent value={data?.value}></NodeContent>

      <NodeFooter id={id} type={type}></NodeFooter>

      <Handle id={Position.Top} type="target" position={Position.Top}></Handle>
      <Handle id={Position.Left} type="target" position={Position.Left}></Handle>
      <Handle id={Position.Bottom} type="source" position={Position.Bottom}></Handle>
    </NodeContainer>
  );

}

function handler(observable: Observable<unknown>, notifier: Observable<unknown>): Observable<unknown> {
  return observable.pipe(
    tap(v => console.info('pipe', v)),
    takeUntil(notifier.pipe(tap(v => console.info('notifier', v))))
  );
}

const key = "takeUntil";
const title = "takeUntil()";
const description = "Emits values from the source observable until a notifier observable emits a value, at which point it completes.";


Object.assign(TakeUntilNode, {
  key,
  title,
  description,
  handler,
});