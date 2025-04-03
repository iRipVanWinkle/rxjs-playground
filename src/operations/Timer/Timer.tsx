import { timer } from "rxjs";
import { OperationFunctionParams } from "../../models/OperationFunction";

type TimerConfig = {
  startDue?: number;
  intervalDuration?: number;
};

export default function Timer({config}: OperationFunctionParams<never, never, TimerConfig>) {
  return timer(config?.startDue ?? 0, config?.intervalDuration ?? 1000);
}
