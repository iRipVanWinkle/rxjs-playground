import { Background, Edge, Node, useNodesState, useEdgesState, addEdge, Connection, ReactFlow, useReactFlow, EdgeChange, EdgeTypes, Position } from '@xyflow/react';

import { useCallback } from 'react';
import { ParamEdge } from './edges/ParamEdge';
import { PipeEdge } from './edges/PipeEdge';
import { Markers } from './markers/Markers';

import '@xyflow/react/dist/style.css';
import './Workflow.module.css';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { OperationsSidebar } from './slidebar/OperationsSidebar';

import { nodeTypes } from './nodes';

// const initialNodes: Node[] = [
//   {
//     id: "0",
//     type: "timer",
//     data: {},
//     position: {
//       x: -321.3616711411307,
//       y: -164.86442971261513
//     },
//   },
//   {
//     id: "1",
//     type: "timer",
//     data: {},
//     position: {
//       x: -37.90398637422,
//       y: -298.08853328936414
//     },
//   },
//   {
//     id: "2",
//     type: "tapNode",
//     data: {},
//     position: {
//       x: -35.05290940902208,
//       y: -166.55803822647235
//     }
//   },
//   {
//     id: "3",
//     type: "combineLatest",
//     data: {},
//     position: {
//       x: 223.91846434848622,
//       y: -37.643661675426365
//     }
//   },
//   {
//     id: "4",
//     type: "tapNode",
//     data: {},
//     position: {
//       x: 224.73317950428878,
//       y: 109.64559612003526
//     }
//   },
//   {
//     id: "5",
//     type: "subscriberNode",
//     data: {},
//     position: {
//       x: 225.80576648911858,
//       y: 253.01065574575333
//     }
//   }
// ];
// const initialEdges: Edge[] = [
//   {
//     "source": "1",
//     "target": "2",
//     "id": "reactflow__edge-1-2",
//     data: {
//       key: 'value'
//     },
//     type: "pipeEdge"
//   },
//   {
//     "source": "0",
//     "target": "3",
//     "id": "reactflow__edge-0-3",
//     data: {
//       key: 'value'
//     },
//     type: "paramEdge"
//   },
//   {
//     "source": "2",
//     "target": "3",
//     "id": "reactflow__edge-2-3",
//     data: {
//       key: 'value'
//     },
//     type: "paramEdge"
//   },
//   {
//     "source": "3",
//     "target": "4",
//     "id": "reactflow__edge-3-4",
//     data: {
//       key: 'value'
//     },
//     type: "pipeEdge"
//   },
//   {
//     "source": "4",
//     "target": "5",
//     "id": "reactflow__edge-4-5",
//     data: {
//       key: 'value'
//     },
//     type: "pipeEdge"
//   }
// ];

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
    type: "takeUntil",
    data: {},
    position: {
      x: 223.91846434848622,
      y: -37.643661675426365
    }
  },
  {
    id: "3",
    type: "subscriber",
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
    targetHandle: 'top',
    data: {
      key: 'value'
    },
    type: "pipe"
  },
  {
    "source": "0",
    "target": "2",
    "id": "reactflow__edge-0-3",
    targetHandle: 'left',
    data: {
      key: 'value'
    },
    type: "param"
  },
  {
    "source": "2",
    "target": "3",
    
    "id": "reactflow__edge-2-3",
    data: {
      key: 'value'
    },
    type: "pipe"
  },
];

export const edgeTypes = {
  param: ParamEdge,
  pipe: PipeEdge
}

export function Workflow() {

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback(
    (connector: Connection) => {
      setEdges((eds) => addEdge({
        ...connector,
        type: connector.targetHandle === Position.Left ? 'param' : 'pipe',
        data: {
          key: 'value'
        },
      }, eds))
    },
    [setEdges],
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('operationKey');

      const newNode = {
        id: String(Math.random() * Math.random() * Math.random()),
        position: screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        }),
        data: {  },
        type: type
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
  }, []);
  

  return (
    <>
      <OperationsSidebar />
      <main className="h-screen w-screen">
        <Markers></Markers>
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
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}>
          {/* <MiniMap zoomable pannable position="bottom-left" ariaLabel={null} /> */}
          <SidebarTrigger className='react-flow__panel' />
          <Background />
        </ReactFlow>
      </main>
    </>
  );
}
