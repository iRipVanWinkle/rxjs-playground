import { range } from "rxjs";
import { OperationFunctionParams } from "../../models/OperationFunction";
import { RangeConfig } from "./model";

export default function Range({ config }: OperationFunctionParams<never, never, RangeConfig>) {
  return range(config.start, config.count);
}
