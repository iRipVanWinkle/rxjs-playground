import { groupBy, Observable, tap } from "rxjs";
import { OperationFunctionParams } from "../../models/OperationFunction";
import { GroupByConfig } from "./model";

export default function Interval({ source, config }: OperationFunctionParams<Observable<unknown>, never, GroupByConfig>) {
  console.info((() => eval(config.keySelector))()(3));
  return source.pipe(groupBy(
    (() => eval(config.keySelector))()
  ), tap(v => console.info(v)));
}
