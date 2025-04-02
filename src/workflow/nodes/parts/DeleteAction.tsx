import { NodeHeaderAction } from "@/components/flow/NodeHeader";
import { useWorkContext } from "@/context/WorkContext";
import { useNodeId, useReactFlow } from "@xyflow/react";
import { Trash } from "lucide-react";
import { useCallback } from "react";

export const DeleteAction = () => {
  const id = useNodeId();
  const { setNodes, setEdges } = useReactFlow();

  const { isRunning } = useWorkContext();
 
  const handleClick = useCallback(() => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
    setEdges((prevEdges) => prevEdges.filter(({ source, target }) => id !== source && id !== target));
  }, [id, setNodes, setEdges]);
 
  return (
    <NodeHeaderAction onClick={handleClick} variant="ghost" label="Delete node" disabled={isRunning}>
      <Trash />
    </NodeHeaderAction>
  );
};