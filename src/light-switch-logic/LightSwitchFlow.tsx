import { initialEdges, initialNodes } from '@/lib/initialData';
import {
	addEdge,
	Background,
	Connection,
	Controls,
	Edge,
	MiniMap,
	Node,
	OnConnect,
	OnEdgesChange,
	OnNodesChange,
	ReactFlow,
	ReactFlowProvider,
	useEdgesState,
	useNodesState,
} from '@xyflow/react';
import React, { useCallback, useEffect, useState } from 'react';
import { evaluateCircuit } from './helpers/evaluateCircuit';
import InputNode from './nodes/inputNode';

const nodeTypes = {
	inputNode: InputNode,
};

const LightSwitchFlow: React.FC = () => {
	const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges);
	const [isDeleting, setIsDeleting] = useState<boolean>(false);

	const onConnect: OnConnect = useCallback(
		(params: Edge<any> | Connection) => {
			setEdges(eds => {
				const updatedEdges = eds.filter(
					edge =>
						!(
							edge.target === params.target &&
							edge.targetHandle === params.targetHandle
						) &&
						!(
							edge.source === params.source &&
							edge.sourceHandle === params.sourceHandle
						)
				);

				const newEdges = addEdge(params, updatedEdges);

				evaluateCircuit({
					nodesCopy: [...nodes],
					edgesCopy: [...edges],
					setNodes,
					setEdges,
				});
				return newEdges;
			});
		},
		[nodes, evaluateCircuit]
	);

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

	const onEdgesChangeHandler: OnEdgesChange = changes => {
		onEdgesChange(changes);
		evaluateCircuit({
			nodesCopy: [...nodes],
			edgesCopy: [...edges],
			setNodes,
			setEdges,
		});
	};

	useEffect(() => {
		evaluateCircuit({
			nodesCopy: [...nodes],
			edgesCopy: [...edges],
			setNodes,
			setEdges,
		});
	}, []);

	return (
		<div style={{ width: '100%', height: '100vh' }}>
			<ReactFlowProvider>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChangeHandler}
					onEdgesChange={onEdgesChangeHandler}
					onConnect={onConnect}
					// onInit={onInit}
					// onNodeClick={onNodeClick}
					// onPaneClick={onPaneClick}
					nodeTypes={nodeTypes}
				>
					<MiniMap className='bg-white border rounded w-40 h-28' />
					<Controls className='bg-white border rounded' />
					<Background color='#aaa' gap={16} />
				</ReactFlow>
			</ReactFlowProvider>
		</div>
	);
};

export default LightSwitchFlow;
