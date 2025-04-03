import { OperationFunction } from "@/models";
import TakeUntil from "./TakeUntil";
import TakeUntilNode from "./TakeUntilNode";

const key = "takeUntil";
const title = "takeUntil()";
const description = "Emits values from the source observable until a notifier observable emits a value, at which point it completes.";
const group = "Filtering Operators";

Object.assign(TakeUntil, {
  key,
  title,
  group,
  description,
  Node: TakeUntilNode
});

export default TakeUntil as OperationFunction;
