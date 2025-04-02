import { BaseOperationData } from "@/models/OperationFunction";
import { Node } from "@xyflow/react";

export type GroupByConfig = BaseOperationData & {
  keySelector: string;
};

export type GroupByNodeType = Node<GroupByConfig>;