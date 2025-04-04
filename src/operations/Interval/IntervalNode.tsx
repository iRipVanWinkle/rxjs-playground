import { Handle, NodeProps, Position } from "@xyflow/react";
import { NodeContent } from "../../workflow/nodes/parts/NodeContent";
import { NodeFooter } from "../../workflow/nodes/parts/NodeFooter";
import { NodeContainer } from "../../workflow/nodes/parts/NodeContainer";
import { NodeHeader } from "../../workflow/nodes/parts/NodeHeader";
import { IntervalNodeType } from "./model";
import IntervalForm from "./IntervalForm";

export default function IntervalNode(props: NodeProps<IntervalNodeType>) {
  const { id, data } = props;

  return (
    <NodeContainer {...props}>
      <NodeHeader id={id} name="interval()" edit editForm={<IntervalForm />}></NodeHeader>

      <NodeContent value={data?.value}>

        {data?.period && <div>Period: {data?.period}</div>}
        {data?.value !== undefined ? <div>value: {JSON.stringify(data?.value)}</div> : <div>&nbsp;</div>}

      </NodeContent>

      <NodeFooter></NodeFooter>
      
      <Handle id={Position.Bottom} type="source" position={Position.Bottom} ></Handle>
    </NodeContainer>
  );
}
