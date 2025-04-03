import { DataEdge } from "@/components/flow/DataEdge";
import { EdgeProps } from "@xyflow/react";

export function ParamEdge(props: EdgeProps<DataEdge>) {
    return <DataEdge {...props}></DataEdge>
}
