import Buffer from "./Buffer";
import BufferNode from "./BufferNode";
import { Operation } from "@/models/OperationFunction";

const key = "buffer";
const title = "buffer()";
const description = "Buffers the source Observable values until closingNotifier emits.";
const group = "Transformation Operators";

export default {
  key,
  title,
  group,
  description,
  handler: Buffer,
  Node: BufferNode
} as Operation;
