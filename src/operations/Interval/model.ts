import { BaseOperationData } from "@/models/OperationFunction";
import { Node } from "@xyflow/react";

export type IntervalConfig = BaseOperationData & {
    period?: number;
};

export type IntervalNodeType = Node<IntervalConfig>;