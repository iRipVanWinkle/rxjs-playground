import ReactFlow, { Background, Edge, Node, MiniMap, useNodesState, useEdgesState, addEdge, Connection } from 'reactflow';

import 'reactflow/dist/style.css';
import { FromEventNode } from './nodes/FromEventNode';
import { TimerNode } from './nodes/TimerNode';
import { TapNode } from './nodes/TapNode';
import { SubscriberNode } from './nodes/SubscriberNode';
import { useCallback } from 'react';
import { CombineLatestNode } from './nodes/CombineLatestNode';

const initialNodes: Node[] = [
  {
    id: "0",
    type: "timer",
    data: {},
    position: {
      x: -179.89288276561302,
      y: -99.36962027950509
    },
  },
  {
    id: "1",
    type: "timer",
    data: {},
    position: {
      x: -186.57720378737977,
      y: -254.8619590635115
    },
  },
  {
    id: "2",
    type: "tapNode",
    data: {},
    position: {
      x: -35.05290940902208,
      y: -166.55803822647235
    }
  },
  {
    id: "3",
    type: "combineLatest",
    data: {},
    position: {
      x: -22.132201863189806,
      y: -24.693626611653936
    }
  },
  {
    id: "4",
    type: "tapNode",
    data: {},
    position: {
      x: 44.609964526363214,
      y: 74.32731867338322
    }
  },
  {
    id: "5",
    type: "subscriberNode",
    data: {},
    position: {
      x: 93.95086402161758,
      y: 172.955893533342
    }
  }
];
const initialEdges: Edge[] = [
  {
      "source": "1",
      "target": "2",
      "id": "reactflow__edge-1-2"
  },
  {
      "source": "0",
      "target": "3",
      "id": "reactflow__edge-0-3"
  },
  {
      "source": "2",
      "target": "3",
      "id": "reactflow__edge-2-3"
  },
  {
      "source": "3",
      "target": "4",
      "id": "reactflow__edge-3-4"
  },
  {
      "source": "4",
      "target": "5",
      "id": "reactflow__edge-4-5"
  }
];

export const nodeTypes = {
  fromEvent: FromEventNode,
  timer: TimerNode,
  combineLatest: CombineLatestNode,
  tapNode: TapNode,
  subscriberNode: SubscriberNode,
}

export function Workflow() {

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <ReactFlow className="workflow" fitView nodesDraggable nodes={nodes} edges={edges} onNodesChange={onNodesChange} nodeTypes={nodeTypes}
      onEdgesChange={onEdgesChange} onConnect={onConnect}>
      {/* <MiniMap zoomable pannable position="bottom-left" ariaLabel={null} /> */}
      <Background />
    </ReactFlow>
  );
}
