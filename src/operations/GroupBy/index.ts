import GroupBy from "./GroupBy";
import { BaseOperationData, Operation } from "@/models/OperationFunction";
import GroupByNode from "./GroupByNode";

const key = 'groupBy';
const title  = "groupBy()";
const group  = "Transformation Operators";
const description = ""
const defaultData = {
  keySelector: '(n) => n % 2'
} as BaseOperationData;

export default {
  key,
  title,
  group,
  description,
  defaultData,
  handler: GroupBy,
  Node: GroupByNode
} as Operation;
