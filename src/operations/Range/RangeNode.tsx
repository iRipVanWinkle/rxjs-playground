import { Handle, NodeProps, Position } from "@xyflow/react";
import { NodeContent } from "../../workflow/nodes/parts/NodeContent";
import { NodeFooter } from "../../workflow/nodes/parts/NodeFooter";
import { NodeContainer } from "../../workflow/nodes/parts/NodeContainer";
import { NodeHeader } from "../../workflow/nodes/parts/NodeHeader";
import { RangeNodeType } from "./model";
import RangeForm from "./RangeForm";

export default function RangeNode(props: NodeProps<RangeNodeType>) {
  const { id, data } = props;

  return (
    <NodeContainer {...props}>
      <NodeHeader id={id} name="range()" editForm={<RangeForm />}></NodeHeader>

      <NodeContent value={data?.value}>
        <ul className="text-xs text-muted-foreground list-none">
          <li>Start: {data?.start ?? '0'}</li>
          <li>Count: {data?.count ?? '-'}</li>
          <li>{data?.value !== undefined ? <div>Value: {JSON.stringify(data?.value)}</div> : <div>&nbsp;</div>}</li>
        </ul>
      </NodeContent>

      <NodeFooter></NodeFooter>

      <Handle id={Position.Bottom} type="source" position={Position.Bottom} ></Handle>
    </NodeContainer>
  );
}
