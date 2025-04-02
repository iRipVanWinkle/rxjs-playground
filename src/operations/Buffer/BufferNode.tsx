import { Handle, NodeProps, Position } from "@xyflow/react";
import { NodeHeader } from "../../workflow/nodes/parts/NodeHeader";
import { NodeContent } from "../../workflow/nodes/parts/NodeContent";
import { NodeFooter } from "../../workflow/nodes/parts/NodeFooter";
import { NodeContainer } from "../../workflow/nodes/parts/NodeContainer";

export default function BufferNode(props: NodeProps) {
  const { id, data } = props;

  return (
    <NodeContainer>

      <NodeHeader id={id} name="buffer()"></NodeHeader>

      <NodeContent value={data?.value}></NodeContent>

      <NodeFooter></NodeFooter>

      <Handle id={Position.Top} type="target" position={Position.Top}></Handle>
      <Handle id={Position.Left} type="target" position={Position.Left}></Handle>
      <Handle id={Position.Bottom} type="source" position={Position.Bottom}></Handle>
    </NodeContainer>
  );

}
