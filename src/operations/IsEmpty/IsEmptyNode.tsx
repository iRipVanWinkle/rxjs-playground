import { NodeContainer } from "@/workflow/nodes/parts/NodeContainer";
import { NodeContent } from "@/workflow/nodes/parts/NodeContent";
import { NodeFooter } from "@/workflow/nodes/parts/NodeFooter";
import { NodeHeader } from "@/workflow/nodes/parts/NodeHeader";
import { Handle, NodeProps, Position } from "@xyflow/react";

export default function IsEmptyNode(props: NodeProps) {
  const { id, data } = props;

  return (
    <NodeContainer>
      <NodeHeader id={id} name="isEmpty()"></NodeHeader>
      <NodeContent>
        <ul className="text-xs text-muted-foreground list-none">
          <li>{data?.value !== undefined ? <div>Value: {JSON.stringify(data?.value)}</div> : <div>&nbsp;</div>}</li>
        </ul>
      </NodeContent>

      <NodeFooter></NodeFooter>
      
      <Handle id={Position.Top} type="target" position={Position.Top} ></Handle>
      <Handle id={Position.Bottom} type="source" position={Position.Bottom} ></Handle>
    </NodeContainer>
  );
}

