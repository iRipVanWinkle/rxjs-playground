import Delay from "./Delay";
import { BaseOperationData, Operation } from "@/models/OperationFunction";
import DelayNode from "./DelayNode";

const key = 'delay';
const title  = "delay()";
const group  = "Utility Operators";
const description = "Delays the emission of items from the source Observable by a given timeout or until a given Date."
const defaultData = {
  due: 1
} as BaseOperationData;

export default {
  key,
  title,
  group,
  description,
  defaultData,
  handler: Delay,
  Node: DelayNode
} as Operation;
