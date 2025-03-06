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
	ReactFlowInstance,
	ReactFlowProvider,
	useEdgesState,
	useNodesState,
} from '@xyflow/react';
import React, { useCallback, useEffect, useState } from 'react';
import { evaluateCircuit } from './helpers/evaluateCircuit';
import GateNode from './nodes/GateNode';
import InputNode from './nodes/InputNode';
import OutputNode from './nodes/OutputNode';

const nodeTypes = {
	inputNode: InputNode,
	outputNode: OutputNode,
	gateNode: GateNode,
};

const LightSwitchFlow: React.FC = () => {
	const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges);
	const [isFitViewDone, setIsFitViewDone] = useState(false);
	const [isDeleting, setIsDeleting] = useState<boolean>(false);

	const onInit = useCallback(
		(instance: ReactFlowInstance) => {
			if (!isFitViewDone) {
				instance.fitView({ padding: 0.1 });
				setIsFitViewDone(true);
			}
		},
		[isFitViewDone]
	);

	const topologicalSort = useCallback(
		(nodes: Node[], edges: Edge[]): Node[] => {
			const sorted: Node[] = [];
			const visited = new Set<string>();

			const visit = (node: Node) => {
				if (visited.has(node.id)) return;
				visited.add(node.id);

				const outgoingEdges = edges.filter(edge => edge.source === node.id);
				outgoingEdges.forEach(edge => {
					const targetNode = nodes.find(n => n.id === edge.target);
					if (targetNode) visit(targetNode);
				});

				sorted.push(node);
			};

			nodes.forEach(node => visit(node));

			return sorted.reverse();
		},
		[]
	);

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
					topologicalSort,
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
			topologicalSort,
		});
	};

	const onEdgesChangeHandler: OnEdgesChange = changes => {
		onEdgesChange(changes);
		evaluateCircuit({
			nodesCopy: [...nodes],
			edgesCopy: [...edges],
			setNodes,
			setEdges,
			topologicalSort,
		});
	};

	useEffect(() => {
		evaluateCircuit({
			nodesCopy: [...nodes],
			edgesCopy: [...edges],
			setNodes,
			setEdges,
			topologicalSort,
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
					onInit={onInit}
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
