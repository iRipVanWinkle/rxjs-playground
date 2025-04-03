import { Background, Edge, Node, MiniMap, useNodesState, useEdgesState, addEdge, Connection, ReactFlow } from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { FromEventNode } from './nodes/FromEventNode';
import { TimerNode } from './nodes/TimerNode';
import { TapNode } from './nodes/TapNode';
import { SubscriberNode } from './nodes/SubscriberNode';
import { useCallback } from 'react';
import { CombineLatestNode } from './nodes/CombineLatestNode';
import { RaceNode } from './nodes/RaceNode';
import { ZipNode } from './nodes/ZipNode';
import { ParamEdge } from './edges/ParamEdge';
import { PipeEdge } from './edges/PipeEdge';

const initialNodes: Node[] = [
  {
    id: "0",
    type: "timer",
    data: {},
    position: {
      x: -321.3616711411307,
      y: -164.86442971261513
    },
  },
  {
    id: "1",
    type: "timer",
    data: {},
    position: {
      x: -37.90398637422,
      y: -298.08853328936414
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
    type: "raceNode",
    data: {},
    position: {
      x: 223.91846434848622,
      y: -37.643661675426365
    }
  },
  {
    id: "4",
    type: "tapNode",
    data: {},
    position: {
      x: 224.73317950428878,
      y: 109.64559612003526
    }
  },
  {
    id: "5",
    type: "subscriberNode",
    data: {},
    position: {
      x: 225.80576648911858,
      y: 253.01065574575333
    }
  }
];
const initialEdges: Edge[] = [
  {
    "source": "1",
    "target": "2",
    "id": "reactflow__edge-1-2",
    type: "pipeEdge"
  },
  {
    "source": "0",
    "target": "3",
    "id": "reactflow__edge-0-3",
    type: "paramEdge"
  },
  {
    "source": "2",
    "target": "3",
    "id": "reactflow__edge-2-3",
    type: "paramEdge"
  },
  {
    "source": "3",
    "target": "4",
    "id": "reactflow__edge-3-4",
    type: "pipeEdge"
  },
  {
    "source": "4",
    "target": "5",
    "id": "reactflow__edge-4-5",
    type: "pipeEdge"
  }
];

export const nodeTypes = {
  fromEvent: FromEventNode,
  timer: TimerNode,
  combineLatest: CombineLatestNode,
  raceNode: RaceNode,
  zipNode: ZipNode,
  tapNode: TapNode,
  subscriberNode: SubscriberNode,
}

export const edgeTypes = {
  paramEdge: ParamEdge,
  pipeEdge: PipeEdge
}

export function Workflow() {

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <ReactFlow
      className="workflow"
      fitView
      nodesDraggable
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}>
      {/* <MiniMap zoomable pannable position="bottom-left" ariaLabel={null} /> */}
      <Background />
    </ReactFlow>
  );
}
