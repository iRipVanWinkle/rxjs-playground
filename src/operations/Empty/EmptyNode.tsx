import { Handle, NodeProps, Position } from "@xyflow/react";
import { NodeContent } from "../../workflow/nodes/parts/NodeContent";
import { NodeFooter } from "../../workflow/nodes/parts/NodeFooter";
import { NodeContainer } from "../../workflow/nodes/parts/NodeContainer";
import { NodeHeader } from "../../workflow/nodes/parts/NodeHeader";

export default function EmptyNode(props: NodeProps) {
  const { id } = props;

  return (
    <NodeContainer {...props}>
      <NodeHeader id={id} name="EMPTY"></NodeHeader>

      <NodeContent></NodeContent>

      <NodeFooter></NodeFooter>

      <Handle id={Position.Bottom} type="source" position={Position.Bottom} ></Handle>
    </NodeContainer>
  );
}
