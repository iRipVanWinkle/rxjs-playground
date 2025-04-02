import { delay, Observable } from "rxjs";
import { OperationFunctionParams } from "../../models/OperationFunction";
import { DelayConfig } from "./model";

export default function Delay({ source, config }: OperationFunctionParams<Observable<unknown>, never, DelayConfig>) {
  return source.pipe(delay(config.due));
}
