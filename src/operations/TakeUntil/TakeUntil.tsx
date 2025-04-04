import { Observable, takeUntil } from "rxjs";
import { OperationFunctionParams } from "../../models/OperationFunction";

export default function TakeUntil({ source, params: notifier }: OperationFunctionParams<Observable<unknown>, Observable<unknown>, never>) {
  return source.pipe(
    takeUntil(notifier)
  );
}
