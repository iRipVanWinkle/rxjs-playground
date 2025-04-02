import { BaseOperationData } from "@/models/OperationFunction";
import { Node } from "@xyflow/react";

export type TakeConfig = BaseOperationData & {
  count: number;
};

export type TakeNodeType = Node<TakeConfig>;