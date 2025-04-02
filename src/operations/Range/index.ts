import Range from "./Range";
import { BaseOperationData, Operation } from "@/models/OperationFunction";
import RangeNode from "./RangeNode";

const key = 'range';
const title  = "range()";
const group  = "Creation Operators";
const description = "Creates an Observable that emits a sequence of numbers within a specified range."
const defaultData = {
  start: 1
} as BaseOperationData;

export default {
  key,
  title,
  group,
  description,
  handler: Range,
  Node: RangeNode,
  defaultData
} as Operation;
