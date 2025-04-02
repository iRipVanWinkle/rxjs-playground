import { OperationFunctionParams } from "@/models/OperationFunction";
import { Observable, Observer } from "rxjs";

type SubscriberConfig<T = unknown> = {
  observerOrNext?: Partial<Observer<T>> | ((value: T) => void)
};

export default function Subscriber({source, config}: OperationFunctionParams<Observable<unknown>, Observable<unknown>, SubscriberConfig>) {
  const noop = () => {
    // Do nothing
  };

  return source.subscribe(config.observerOrNext ?? noop);
}
