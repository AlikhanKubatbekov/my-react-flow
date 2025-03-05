import {
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
	Background,
	EdgeChange,
	EdgeTypes,
	MiniMap,
	Node,
	NodeChange,
	NodeTypes,
	OnConnect,
	ReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import React, { useCallback, useState } from 'react';
import TextUpdaterNode from './TextUpdaterNode';

const initialNodes: Node[] = [
	{
		id: 'n-1',
		type: 'textUpdater',
		position: { x: 200, y: 200 },
		data: { label: 123 },
	},
	{
		id: 'n-2',
		type: 'output',
		position: { x: 200, y: 300 },
		data: { label: 'Output 2' },
	},
	{
		id: 'n-3',
		type: 'output',
		position: { x: 400, y: 300 },
		data: { label: 'Output 3' },
	},
];

const initialEdges = [
	{ id: 'e-1', source: 'n-1', target: 'n-2', sourceHandle: 'a' },
	{ id: 'e-2', source: 'n-1', target: 'n-3', sourceHandle: 'b' },
];

const nodeTypes = {
	// 'position-logger': PositionLoggerNode,
	textUpdater: TextUpdaterNode,
} satisfies NodeTypes;

export const edgeTypes = {} satisfies EdgeTypes;

const TextNodeFlow: React.FC = () => {
	const [nodes, setNodes] = useState(initialNodes);
	const [edges, setEdges] = useState(initialEdges);

	const onNodesChange = useCallback(
		(changes: NodeChange[]) => setNodes(nds => applyNodeChanges(changes, nds)),
		[setNodes]
	);

	const onEdgesChange = useCallback(
		(changes: EdgeChange[]) => setEdges(eds => applyEdgeChanges(changes, eds)),
		[setEdges]
	);

	const onConnect: OnConnect = useCallback(
		connection => {
			setEdges(edges => addEdge(connection, edges));
		},
		[setEdges]
	);

	return (
		<div style={{ width: '100%', height: '100vh' }}>
			<ReactFlow
				fitView
				nodes={nodes}
				nodeTypes={nodeTypes}
				onNodesChange={onNodesChange}
				edges={edges}
				edgeTypes={edgeTypes}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				className='bg-slate-600'
			>
				<MiniMap />
				<Background color='#ccc' variant={'dots'} />
			</ReactFlow>
		</div>
	);
};

export default TextNodeFlow;
