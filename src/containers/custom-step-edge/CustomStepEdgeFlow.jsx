import {
	addEdge,
	Background,
	ReactFlow,
	ReactFlowProvider,
	useEdgesState,
	useNodesState,
} from '@xyflow/react';
import { useCallback } from 'react';
import StepEdge from './StepEdge';

const edgeTypes = {
	'step-edge': StepEdge,
};

const initialNodes = [
	{ id: 'n-1', position: { x: 0, y: 0 }, data: { label: 'Node A' } },
	{ id: 'n-2', position: { x: 0, y: 100 }, data: { label: 'Node B' } },
	{ id: 'n-3', position: { x: 100, y: 200 }, data: { label: 'Node C' } },
];

const initialEdges = [
	{ id: 'e-0', source: 'n-1', target: 'n-2', type: 'step-edge' },
];

const CustomStepEdgeFlow = () => {
	const [nodes, , onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

	const onConnect = useCallback(
		connection => {
			const edge = {
				...connection,
				type: 'step-edge',
				id: `e-${edges.length + 1}`,
			};
			setEdges(eds => addEdge(edge, eds));
		},
		[setEdges, edges.length]
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

export default CustomStepEdgeFlow;
