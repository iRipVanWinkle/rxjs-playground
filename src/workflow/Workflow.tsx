import { Background, Edge, Node, useNodesState, useEdgesState, addEdge, Connection, ReactFlow, useReactFlow, Position } from '@xyflow/react';
import { v4 as uuidv4 } from 'uuid';
import { useCallback } from 'react';
import { Markers } from './markers/Markers';

import '@xyflow/react/dist/style.css';
import './Workflow.module.css';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { OperationsSidebar } from './slidebar/OperationsSidebar';
import { nodeTypes, Operations } from './nodes';
import { edgeTypes } from './edges';

const initNodes = [
  {
      "id": "245ed00d-cce8-4553-bef4-ae6d7e96b1cd",
      "position": {
          "x": 317,
          "y": -73
      },
      "data": {
          "period": 1000
      },
      "type": "interval",
  },
  {
      "id": "97013593-bb95-4d1f-8909-f8394683895a",
      "position": {
          "x": 384.5,
          "y": 186.5
      },
      "data": {},
      "type": "subscriber",
  }
]

export function Workflow() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { screenToFlowPosition } = useReactFlow();

  console.info(nodes, edges);

  const handleConnect = useCallback(
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

  const handleNodesDelete = useCallback((deletedNodes: Node[]) => {
    const deletedIds = deletedNodes.map((node) => node.id);
    setEdges((eds) => eds.filter((e) => !deletedIds.includes(e.source) && !deletedIds.includes(e.target)));
  }, [setEdges])

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('operationKey');

      const newNode = {
        id: uuidv4(),
        position: screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        }),
        data: Operations[type].defaultData ?? {},
        type: type
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes],
  );

  const handleDragOver = useCallback((event: React.DragEvent) => {
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
          onConnect={handleConnect}
          onNodesDelete={handleNodesDelete}
          onDrop={handleDrop}
          onDragOver={handleDragOver}>
          <SidebarTrigger className='react-flow__panel' />
          <Background />
        </ReactFlow>
      </main>
    </>
  );
}
