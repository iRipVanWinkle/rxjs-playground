import { BaseOperationData } from "@/models/OperationFunction";
import { Node } from "@xyflow/react";

export type DelayConfig = BaseOperationData & {
  due: number;
};

export type DelayNodeType = Node<DelayConfig>;