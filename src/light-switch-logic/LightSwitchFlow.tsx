import { ReactComponent as Close } from '@/assets/icons/close.svg';
import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';
import { initialEdges, initialNodes } from '@/lib/initialData';
import {
	addEdge,
	Background,
	Connection,
	Controls,
	Edge,
	Node,
	OnConnect,
	OnEdgesChange,
	OnNodesChange,
	ReactFlow,
	ReactFlowInstance,
	ReactFlowProvider,
	useEdgesState,
	useNodesState,
	useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Drawer from './components/Drawer/Drawer';
import { evaluateCircuit } from './helpers/evaluateCircuit';
import './light-switch.css';
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
	const [selectedNode, setSelectedNode] = useState<Node | null>(null);
	const [isFitViewDone, setIsFitViewDone] = useState(false);
	const [isDrawerOpen, setDrawerOpen] = useState(false);
	const [isDeleting, setIsDeleting] = useState<boolean>(false);
	const reactFlowInstance = useReactFlow();
	const reactFlowWrapper = useRef<HTMLDivElement>(null);

	const addNode = useCallback(
		(nodeType: string, gateType: string = '') => {
			let label;
			let value;
			let isDynamic = true;

			if (nodeType === 'inputNode') {
				if (gateType === 'high') {
					label = 'High (1)';
					value = 1;
					isDynamic = false;
				} else if (gateType === 'low') {
					label = 'Low (0)';
					value = 0;
					isDynamic = false;
				} else {
					label = 'Input';
					value = 0;
				}
			} else if (nodeType === 'outputNode') {
				label = 'Lamp';
				value = 0;
			} else {
				label = gateType ? `${gateType.toUpperCase()} Gate` : '';
			}

			const centerX = window.innerWidth / 4;
			const centerY = window.innerHeight / 4;
			const position = reactFlowInstance?.screenToFlowPosition({
				x: centerX,
				y: centerY,
			}) || { x: centerX, y: centerY };

			const newNode: Node = {
				id: `${nodeType}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
				type: nodeType,
				data: { gateType, value, label, isDynamic },
				position,
				draggable: true,
			};

			setNodes(nds => nds.concat(newNode));
			setDrawerOpen(false);
		},
		[reactFlowInstance, setNodes, setDrawerOpen]
	);

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
						)
				);
				const newEdges = addEdge(params, updatedEdges);

				evaluateCircuit({
					nodesCopy: [...nodes],
					edgesCopy: [...newEdges],
					setNodes,
					setEdges,
					topologicalSort,
				});
				return newEdges;
			});
		},
		[nodes, setEdges, evaluateCircuit, topologicalSort]
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

	const onNodeClick = useCallback((_: any, node: Node) => {
		setSelectedNode(node);
	}, []);

	const onPaneClick = useCallback(() => {
		setSelectedNode(null);
	}, []);

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
		<div className='flex h-[calc(100vh-175px)] relative'>
			<div className='md:hidden absolute top-4 left-4 z-10 rounded-lg'>
				<Button
					variant='contained'
					className='px-2'
					onClick={() => setDrawerOpen(true)}
				>
					<Typography variant='body2' className='text-white text-nowrap'>
						Add Elements
					</Typography>
					<Close className='rotate-45 w-6 h-6' />
				</Button>
			</div>

			<Drawer
				isOpen={isDrawerOpen}
				onClose={() => setDrawerOpen(false)}
				addNode={addNode}
			/>

			<div className='flex-grow' ref={reactFlowWrapper}>
				<ReactFlow
					fitView
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChangeHandler}
					onEdgesChange={onEdgesChangeHandler}
					onConnect={onConnect}
					nodeTypes={nodeTypes}
					className='bg-dark-gray'
					onInit={onInit}
					onNodeClick={onNodeClick}
					onPaneClick={onPaneClick}
				>
					<Controls className='bg-white border rounded' />
					<Background gap={16} />
				</ReactFlow>
			</div>
		</div>
	);
};

const LightSwitchFlowWithProvider: React.FC = () => (
	<ReactFlowProvider>
		<LightSwitchFlow />
	</ReactFlowProvider>
);

export default LightSwitchFlowWithProvider;
