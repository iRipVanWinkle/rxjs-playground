import { OperationFunction } from "@/models";
import Subscriber from "./Subscriber";
import SubscriberNode from "./SubscriberNode";

const key = 'subscriber';
const title = "subscribe()";
const group = "Utility Operators";
const description = "Subscribes to an observable and allows you to handle emitted values, errors, and completion notifications. It is the final step in the RxJS pipeline where you can define what to do with the data emitted by the observable.";

Object.assign(Subscriber, {
  key,
  title,
  group,
  description,
  Node: SubscriberNode
});

export default Subscriber as OperationFunction;
