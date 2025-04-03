import { BaseNode, BaseNodeProps } from '@/components/flow/BaseNode';
import { NodeStatusIndicator, NodeStatusIndicatorProps } from '@/components/flow/NodeStatusIndicator';
import { useNodeId, useNodesData, useReactFlow } from '@xyflow/react';
import { ReactNode } from 'react';

type NodeContainerProps = BaseNodeProps & {
  children?: ReactNode
}

export function NodeContainer({ selected, children }: NodeContainerProps) {
  const nodeId = useNodeId();
  const nodeData = useNodesData(nodeId as string)
  const { updateNode } = useReactFlow();


  const {
    status = 'idle'
  } = nodeData?.data || {};

  let indicatorStatus: NodeStatusIndicatorProps['status'] = 'initial';
  switch (status) {
    case 'active':
      indicatorStatus = 'loading';
      break;
    case 'completed':
      indicatorStatus = 'success';
      break;
    case 'error':
      indicatorStatus = 'error';
      break;
  }

  // let className = 'relative rounded-md border bg-white text-card-foreground hover:ring-1 w-[260px]';
  if (nodeData?.data?.status === 'active') {
    // className += ' border-pink-600';

    // setTimeout(() => {
    //   updateNode(nodeId as string, { data: { ...nodeData.data, active: false } });
    //   nodeData.data.status = 'idle';
    // }, 250);
  }

  return <NodeStatusIndicator status={indicatorStatus}>
    <BaseNode selected={selected} className="px-3 py-2 w-[260px]">
      {children}
    </BaseNode>
  </NodeStatusIndicator>
}