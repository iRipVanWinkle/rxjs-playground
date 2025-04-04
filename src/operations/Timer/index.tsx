import Timer from "./Timer";
import TimerNode from "./TimerNode";
import { Operation } from "@/models/OperationFunction";

const key = 'timer';
const title  = "timer()";
const group  = "Creation Operators";
const description = "Creates an observable that emits sequential numbers spaced by a given time interval. The first number emitted is 0, and the second number is 1, and so on. The timer will emit the first value after the specified delay, and then it will emit subsequent values at the specified interval.";

export default {
  key,
  title,
  group,
  description,
  handler: Timer,
  Node: TimerNode
} as Operation;