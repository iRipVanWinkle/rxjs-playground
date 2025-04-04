import { interval } from "rxjs";
import { OperationFunctionParams } from "../../models/OperationFunction";
import { IntervalConfig } from "./model";

export default function Interval({ config }: OperationFunctionParams<never, never, IntervalConfig>) {
  return interval(config.period);
}
