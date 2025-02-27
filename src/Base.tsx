import { ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import React from 'react';
import { edgeTypes } from './edges/edges';
import { useBase } from './hooks/useBase';
import { nodeTypes } from './nodes/nodes';

const Base: React.FC = () => {
	const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useBase();

	return (
		<div style={{ width: '100vw', height: '100vh' }}>
			<ReactFlow
				nodes={nodes}
				onNodesChange={onNodesChange}
				nodeTypes={nodeTypes}
				edges={edges}
				edgeTypes={edgeTypes}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				fitView
			/>
		</div>
	);
};

export default Base;
