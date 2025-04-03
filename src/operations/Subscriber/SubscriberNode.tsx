import { useRun } from "@/hooks/use-run";
import { NodeContainer } from "@/workflow/nodes/parts/NodeContainer";
import { NodeContent } from "@/workflow/nodes/parts/NodeContent";
import { NodeFooter } from "@/workflow/nodes/parts/NodeFooter";
import { NodeHeader } from "@/workflow/nodes/parts/NodeHeader";
import { Handle, NodeProps, Position } from "@xyflow/react";


export default function SubscriberNode(props: NodeProps) {
  const { id, data, type } = props;

  const {run: runObserver} = useRun();

  const handleRun = () => {
    runObserver();
  }

  return (
    <NodeContainer>
      <NodeHeader id={id} name="subscribe()" type={type} onRun={handleRun}></NodeHeader>
      <NodeContent value={data?.value}></NodeContent>
      <NodeFooter id={id} type={type}></NodeFooter>
      <Handle id={Position.Top} type="target" position={Position.Top} ></Handle>
    </NodeContainer>
  );
}
