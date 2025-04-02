import { Handle, NodeProps, Position } from "@xyflow/react";
import { NodeContent } from "../../workflow/nodes/parts/NodeContent";
import { NodeFooter } from "../../workflow/nodes/parts/NodeFooter";
import { NodeContainer } from "../../workflow/nodes/parts/NodeContainer";
import { NodeHeader } from "../../workflow/nodes/parts/NodeHeader";
import TimerForm from "./TimerForm";

export default function TimerNode(props: NodeProps) {
  const { id, type, data } = props;

  return (
    <NodeContainer {...props}>
      <NodeHeader id={id} name="timer()" edit editForm={<TimerForm />}></NodeHeader>

      <NodeContent value={data?.value}>
        {data?.startDue && <div>Start Due: {data?.startDue}</div>}
        {data?.intervalDuration && <div>Interval Duration: {data?.intervalDuration}</div>}
        {data?.value !== undefined ? <div>value: {JSON.stringify(data?.value)}</div> : <div>&nbsp;</div>}
      </NodeContent>

      <NodeFooter id={id} type={type}></NodeFooter>
      <Handle id={Position.Bottom} type="source" position={Position.Bottom} ></Handle>
    </NodeContainer>
  );
}
