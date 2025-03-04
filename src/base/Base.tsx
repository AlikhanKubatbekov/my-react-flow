import { Background, BackgroundVariant, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import React, { useState } from 'react';
import { edgeTypes } from './edges/edges';
import { useBase } from './hooks/useBase';
import { nodeTypes } from './nodes/nodes';

const Base: React.FC = () => {
	const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useBase();
	const [variant, _] = useState<BackgroundVariant | undefined>('dots');

	return (
		<div style={{ width: '100%', height: '100vh' }}>
			<ReactFlow
				nodes={nodes}
				onNodesChange={onNodesChange}
				nodeTypes={nodeTypes}
				edges={edges}
				edgeTypes={edgeTypes}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				fitView
			>
				<Background color='#ccc' variant={variant} />
			</ReactFlow>
		</div>
	);
};

export default Base;
