import { Observable, take } from "rxjs";
import { OperationFunctionParams } from "../../models/OperationFunction";
import { TakeConfig } from "./model";

export default function Take({ source, config }: OperationFunctionParams<Observable<unknown>, never, TakeConfig>) {
  return source.pipe(take(config.count));
}
