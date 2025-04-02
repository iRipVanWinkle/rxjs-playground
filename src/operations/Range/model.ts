import { BaseOperationData } from "@/models/OperationFunction";
import { Node } from "@xyflow/react";

export type RangeConfig = BaseOperationData & {
    start: number;
    count?: number
};

export type RangeNodeType = Node<RangeConfig>;