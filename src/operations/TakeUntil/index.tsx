import TakeUntil from "./TakeUntil";
import TakeUntilNode from "./TakeUntilNode";
import { Operation } from "@/models/OperationFunction";

const key = "takeUntil";
const title = "takeUntil()";
const description = "Emits values from the source observable until a notifier observable emits a value, at which point it completes.";
const group = "Filtering Operators";

export default {
  key,
  title,
  group,
  description,
  handler: TakeUntil,
  Node: TakeUntilNode
} as Operation;