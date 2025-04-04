import Interval from "./Interval";
import { Operation } from "@/models/OperationFunction";
import IntervalNode from "./IntervalNode";

const key = 'interval';
const title  = "interval()";
const group  = "Creation Operators";
const description = "Creates an Observable that emits sequential numbers every specified interval of time."

export default {
  key,
  title,
  group,
  description,
  handler: Interval,
  Node: IntervalNode
} as Operation;
