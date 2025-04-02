import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { NodeContent } from "../../workflow/nodes/parts/NodeContent";
import { NodeFooter } from "../../workflow/nodes/parts/NodeFooter";
import { NodeContainer } from "../../workflow/nodes/parts/NodeContainer";
import { NodeHeader } from "../../workflow/nodes/parts/NodeHeader";
import { BaseOperationData } from "@/models/OperationFunction";

export default function EmptyNode(props: NodeProps<Node<BaseOperationData>>) {
  const { id, data } = props;

  return (
    <NodeContainer {...props}>
      <NodeHeader id={id} name="zip()"></NodeHeader>

      <NodeContent>
      <ul className="text-xs text-muted-foreground list-none">
          <li>{data?.value !== undefined ? <div>Value: {JSON.stringify(data?.value)}</div> : <div>&nbsp;</div>}</li>
        </ul>
      </NodeContent>

      <NodeFooter></NodeFooter>

      <Handle id={Position.Left} type="target" position={Position.Left}></Handle>
      <Handle id={Position.Bottom} type="source" position={Position.Bottom} ></Handle>
    </NodeContainer>
  );
}
