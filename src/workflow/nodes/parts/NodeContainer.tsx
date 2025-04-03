import { useNodeId, useNodesData, useReactFlow } from '@xyflow/react';
import { ReactNode } from 'react';

type NodeContainerProps = {
  children?: ReactNode
}

export function NodeContainer({ children }: NodeContainerProps) {
  const nodeId = useNodeId();
  const nodeData = useNodesData(nodeId as string)
  const { updateNode } = useReactFlow();

  let className = 'relative rounded-md border bg-white text-card-foreground hover:ring-1 w-[260px]';
  if (nodeData?.data?.active) {
    className += ' border-pink-600';

    setTimeout(() => {
      updateNode(nodeId as string, { data: { ...nodeData.data, active: false } });
      nodeData.data.active = false;
    }, 250);
  }

  return <div className={className}>
    {children}
  </div>
}