import Interval from "./Interval";
import { BaseOperationData, Operation } from "@/models/OperationFunction";
import IntervalNode from "./IntervalNode";

const key = 'interval';
const title  = "interval()";
const group  = "Creation Operators";
const description = "Creates an Observable that emits sequential numbers every specified interval of time."
const defaultData = {
  period: 1000
} as BaseOperationData;

export default {
  key,
  title,
  group,
  description,
  defaultData,
  handler: Interval,
  Node: IntervalNode
} as Operation;
