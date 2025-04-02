import MergeMap from "./MergeMap";
import MergeMapNode from "./MergeMapNode";
import { Operation } from "@/models/OperationFunction";

const key = "mergeMap";
const title = "mergeMap()";
const description = "Projects each source value to an Observable which is merged in the output Observable.";
const group = "Transformation Operators";

export default {
  key,
  title,
  group,
  description,
  handler: MergeMap,
  Node: MergeMapNode
} as Operation;
