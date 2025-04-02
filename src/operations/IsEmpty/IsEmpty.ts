import { OperationFunctionParams } from "@/models/OperationFunction";
import { isEmpty, Observable } from "rxjs";

export default function IsEmpty({source}: OperationFunctionParams<Observable<unknown>, never, never>) {
  return source.pipe(isEmpty());
}
