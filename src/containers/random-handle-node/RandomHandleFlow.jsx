import {
	Background,
	ReactFlow,
	ReactFlowProvider,
	addEdge,
	useEdgesState,
	useNodesState,
} from '@xyflow/react';
import { useCallback } from 'react';
import RandomHandleNode from './RandomHandleNode';

const nodeTypes = {
	randomHandle: RandomHandleNode,
};

const RandomHandleFlow = () => {
	const [nodes, , onNodesChange] = useNodesState([
		{
			id: '1',
			type: 'randomHandle',
			position: { x: 250, y: 250 },
			data: {},
		},
	]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);

	const onConnect = useCallback(
		params => setEdges(eds => addEdge(params, eds)),
		[setEdges]
	);

	return (
		<div style={{ width: '100%', height: '100vh' }}>
			<ReactFlowProvider>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
					nodeTypes={nodeTypes}
					fitView
				>
					<Background color='#ccc' variant={'dots'} />
				</ReactFlow>
			</ReactFlowProvider>
		</div>
	);
};

export default RandomHandleFlow;
