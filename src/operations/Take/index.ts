import Take from "./Take";
import { BaseOperationData, Operation } from "@/models/OperationFunction";
import TakeNode from "./TakeNode";

const key = 'take';
const title  = "take()";
const group  = "Filtering Operators";
const description = "Emits only the first count values emitted by the source Observable."
const defaultData = {
  count: 1
} as BaseOperationData;

export default {
  key,
  title,
  group,
  description,
  defaultData,
  handler: Take,
  Node: TakeNode
} as Operation;
