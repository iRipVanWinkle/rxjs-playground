import { NodeProps, useNodeId } from "@xyflow/react";
import { NodeContainer } from "./parts/NodeContainer";

export function FromEventNode(props: NodeProps) {

  return (
    <NodeContainer>
      <div>From Event Node {useNodeId()}</div>
    </NodeContainer>
  );

}
