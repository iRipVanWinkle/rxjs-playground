import { OperationFunctionParams } from "@/models";
import { Observable, zip } from "rxjs";

export default function Zip({ params: observables }: OperationFunctionParams<never, Observable<unknown>, never>) {
  return zip(observables);
}