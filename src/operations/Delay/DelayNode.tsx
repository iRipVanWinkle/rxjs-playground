import { Handle, NodeProps, Position } from "@xyflow/react";
import { NodeContent } from "../../workflow/nodes/parts/NodeContent";
import { NodeFooter } from "../../workflow/nodes/parts/NodeFooter";
import { NodeContainer } from "../../workflow/nodes/parts/NodeContainer";
import { NodeHeader } from "../../workflow/nodes/parts/NodeHeader";
import { DelayNodeType } from "./model";
import DelayForm from "./DelayForm";

export default function DelayNode(props: NodeProps<DelayNodeType>) {
  const { id, data } = props;

  return (
    <NodeContainer {...props}>
      <NodeHeader id={id} name="delay()" edit editForm={<DelayForm />}></NodeHeader>

      <NodeContent value={data?.value}>
        <ul className="text-xs text-muted-foreground list-none">
          <li>Due: {data?.due ?? '-'}</li>
          <li>{data?.value !== undefined ? <div>Value: {JSON.stringify(data?.value)}</div> : <div>&nbsp;</div>}</li>
        </ul>
      </NodeContent>

      <NodeFooter></NodeFooter>

      <Handle id={Position.Top} type="target" position={Position.Top} ></Handle>
      <Handle id={Position.Bottom} type="source" position={Position.Bottom} ></Handle>
    </NodeContainer>
  );
}
