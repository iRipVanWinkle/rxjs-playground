import { buffer, Observable } from "rxjs";
import { OperationFunctionParams } from "../../models/OperationFunction";

export default function Buffer({ source, params: notifier }: OperationFunctionParams<Observable<unknown>, Observable<unknown>, never>) {
  return source.pipe(
    buffer(notifier)
  );
}
