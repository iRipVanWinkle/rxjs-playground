import { Operation, OperationFunction } from "@/models";
import EmptyNode from "./EmptyNode";
import Empty from "./Empty";

const key = 'empty';
const title = "EMPTY";
const group = "Creation Operators";
const description = "A simple Observable that emits no items to the Observer and immediately emits a complete notification.";

export default {
  key,
  title,
  group,
  description,
  handler: Empty as OperationFunction,
  Node: EmptyNode
} as Operation;
