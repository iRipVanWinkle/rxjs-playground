import { Handle, NodeProps, Position } from "@xyflow/react";
import { Observable, timer } from "rxjs";
import { NodeContent } from "./parts/NodeContent";
import { NodeFooter } from "./parts/NodeFooter";
import { NodeContainer } from "./parts/NodeContainer";
import { NodeHeader } from "./parts/NodeHeader";

export function timer(observable: Observable<unknown>): Observable<unknown>  {
  return timer(0, 1000);
}

timer.node = TimerNode;

export function TimerNode(props: NodeProps) {
  const { id, type, data } = props;

  return (
    <NodeContainer {...props}>
      <NodeHeader id={id} name="timer()"></NodeHeader>

      <NodeContent value={data?.value}></NodeContent>

      <NodeFooter id={id} type={type}></NodeFooter>
      
      <Handle id={Position.Bottom}type="source" position={Position.Bottom} ></Handle>
    </NodeContainer>
  );
}

let i = 0;

function handler(observable: Observable<unknown>): Observable<unknown> {
  i++;
  return timer(i % 2 ? 500 : 5000, i % 2 ? 1000 : 500);
}
const key = 'timer';
const title  = "timer()";
const group  = "Creation Operators";
const description = "Creates an observable that emits sequential numbers spaced by a given time interval. The first number emitted is 0, and the second number is 1, and so on. The timer will emit the first value after the specified delay, and then it will emit subsequent values at the specified interval.";

Object.assign(TimerNode, {
  key,
  title,
  group,
  description,
  handler,
});
