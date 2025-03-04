import {
	Background,
	Edge,
	OnConnect,
	ReactFlow,
	ReactFlowProvider,
	addEdge,
	useEdgesState,
	useNodesState,
} from '@xyflow/react';
import { useCallback } from 'react';
import CustomEdge from './CustomEdge';

import '@xyflow/react/dist/style.css';

const initialNodes = [
	{ id: 'n-1', position: { x: 0, y: 0 }, data: { label: 'Node A' } },
	{ id: 'n-2', position: { x: 0, y: 100 }, data: { label: 'Node B' } },
];

const initialEdges: Edge[] = [
	{ id: 'e-1', type: 'custom-edge', source: 'n-1', target: 'n-2' },
];

const edgeTypes = {
	'custom-edge': CustomEdge,
};

const CustomEdgeFlow: React.FC = () => {
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
	const onConnect: OnConnect = useCallback(
		connection => {
			const edge = { ...connection, type: 'custom-edge' };
			setEdges(eds => addEdge(edge, eds));
		},
		[setEdges]
	);

	return (
		<div style={{ width: '100%', height: '100vh' }}>
			<ReactFlowProvider>
				<ReactFlow
					fitView
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
					edgeTypes={edgeTypes}
				/>
				<Background color='#ccc' variant={'dots'} />
			</ReactFlowProvider>
		</div>
	);
};

export default CustomEdgeFlow;
