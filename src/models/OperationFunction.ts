import { ReactNode } from "react";
import { Observable } from "rxjs";

type FullSourceType = Observable<unknown> | Observable<unknown>[] | undefined | never;
type FullParamsType = Observable<unknown> | Observable<unknown>[] | undefined | never;

export type OperationFunctionParams<S = FullSourceType, P = FullParamsType, C = unknown | undefined> = {
  source: S,
  params: P,
  config: C
}

export type OperationFunction<C = unknown, R = Observable<unknown>> = {
  (params?: OperationFunctionParams<FullSourceType, FullParamsType, C>): R;
  Node: () => ReactNode;
  key: string;
  title: string;
  group: string;
  description: string;
};

export type OperationFunctions = Record<string, OperationFunction>;