import { mergeMap, Observable } from "rxjs";
import { OperationFunctionParams } from "../../models/OperationFunction";

export default function MergeMap({ source, params: project }: OperationFunctionParams<Observable<unknown>, Observable<unknown>, never>) {
  return source.pipe(
    mergeMap((v$) => v$ as Observable<unknown>)
  );
}
