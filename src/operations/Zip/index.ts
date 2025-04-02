import { Operation } from "@/models";
import ZipNode from "./ZipNode";
import Zip from "./Zip";

const key = 'zip';
const title = "zip()";
const group = "Join Creation Operators";
const description = "Combines multiple observables into one by emitting an array of their latest values.";

export default {
  key,
  title,
  group,
  description,
  handler: Zip,
  Node: ZipNode
} as Operation;
