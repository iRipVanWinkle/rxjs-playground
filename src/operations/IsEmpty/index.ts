import { Operation } from "@/models";
import IsEmpty from "./IsEmpty";
import IsEmptyNode from "./IsEmptyNode";

const key = 'isEmpty';
const title = "isEmpty()";
const group = "Conditional and Boolean Operators";
const description = "Emits false if the input Observable emits any values, or emits true if the input Observable completes without emitting any values.";

export default {
  key,
  title,
  group,
  description,
  handler: IsEmpty,
  Node: IsEmptyNode
} as Operation;
