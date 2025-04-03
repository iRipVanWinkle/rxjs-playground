import { DataEdge } from "@/components/flow/DataEdge";
import { EdgeProps } from "@xyflow/react";
import { MARKERS } from "../markers/Markers";

export function ParamEdge(props: EdgeProps<DataEdge>) {
  const markerEnd = `url('#${MARKERS.Params}')`
  return <DataEdge {...props} markerEnd={markerEnd}></DataEdge>
}
