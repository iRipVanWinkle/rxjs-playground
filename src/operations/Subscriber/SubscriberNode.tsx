import { useWorkContext } from "@/context/WorkContext";
import { useRun } from "@/hooks/use-run";
import { NodeContainer } from "@/workflow/nodes/parts/NodeContainer";
import { NodeContent } from "@/workflow/nodes/parts/NodeContent";
import { NodeFooter } from "@/workflow/nodes/parts/NodeFooter";
import { NodeHeader } from "@/workflow/nodes/parts/NodeHeader";
import { Handle, NodeProps, Position } from "@xyflow/react";


export default function SubscriberNode(props: NodeProps) {
  const { id, data } = props;

  const {run: runObserver, stop: stopObserver} = useRun();

  const handleRun = () => {
    runObserver();
  }

  const handleStop = () => {
    stopObserver();
  }

  return (
    <NodeContainer>
      <NodeHeader id={id} name="subscribe()" onRun={handleRun} onStop={handleStop}></NodeHeader>
      <NodeContent value={data?.value}></NodeContent>
      <NodeFooter></NodeFooter>
      <Handle id={Position.Top} type="target" position={Position.Top} ></Handle>
    </NodeContainer>
  );
}
