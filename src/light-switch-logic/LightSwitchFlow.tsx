import { initialEdges, initialNodes } from '@/lib/initialData';
import {
	Background,
	Controls,
	Edge,
	MiniMap,
	Node,
	OnNodesChange,
	ReactFlow,
	useEdgesState,
	useNodesState,
} from '@xyflow/react';
import React, { useState } from 'react';
import { evaluateCircuit } from './helpers/evaluateCircuit';
import InputNode from './nodes/inputNode';

const nodeTypes = {
	inputNode: InputNode,
};

const LightSwitchFlow: React.FC = () => {
	const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges);
	const [isDeleting, setIsDeleting] = useState<boolean>(false);

	const onNodesChangeHandler: OnNodesChange = changes => {
		onNodesChange(changes);
		changes.forEach(change => {
			if (change.type === 'remove') {
				setIsDeleting(true);
			}
		});

		evaluateCircuit({
			nodesCopy: [...nodes],
			edgesCopy: [...edges],
			setNodes,
			setEdges,
		});
	};

	return (
		<div style={{ width: '100%', height: '100vh' }}>
			<ReactFlow
				// {...(isReadOnly ? { deleteKeyCode: null } : {})}
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChangeHandler}
				// onEdgesChange={onEdgesChangeHandler}
				// onConnect={onConnect}
				// onInit={onInit}
				// onNodeClick={onNodeClick}
				// onPaneClick={onPaneClick}
				nodeTypes={nodeTypes}
			>
				<MiniMap className='bg-white border rounded w-40 h-28' />
				<Controls className='bg-white border rounded' />
				<Background color='#aaa' gap={16} />
			</ReactFlow>
		</div>
	);
};

export default LightSwitchFlow;
