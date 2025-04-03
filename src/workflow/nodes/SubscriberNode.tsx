import { Handle, NodeProps, Position } from "@xyflow/react";

import { Observable, Observer } from "rxjs";
import { NodeHeader } from "./parts/NodeHeader";
import { NodeContent } from "./parts/NodeContent";
import { NodeFooter } from "./parts/NodeFooter";
import { NodeContainer } from "./parts/NodeContainer";
import { useRun } from "../../hooks/use-run";

export function SubscriberNode(props: NodeProps) {
  const { id, data, type } = props;

  const {run: runObserver} = useRun();

  const handleRun = () => {
    runObserver();
  }

  return (
    <NodeContainer>
      <NodeHeader id={id} name="subscribe()" type={type} onRun={handleRun}></NodeHeader>
      <NodeContent value={data?.value}></NodeContent>
      <NodeFooter id={id} type={type}></NodeFooter>
      <Handle type="target" position={Position.Top} ></Handle>
    </NodeContainer>
  );
}

function handler<T = unknown>(observable: Observable<T>, observerOrNext?: Partial<Observer<T>> | ((value: T) => void)) {
  observable.subscribe(observerOrNext);
}
const key = 'subscriber';
const title = "subscribe()";
const description = "Subscribes to an observable and allows you to handle emitted values, errors, and completion notifications. It is the final step in the RxJS pipeline where you can define what to do with the data emitted by the observable.";


Object.assign(SubscriberNode, {
  key,
  title,
  description,
  handler,
});
