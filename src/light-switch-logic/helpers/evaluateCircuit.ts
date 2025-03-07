import { Edge, Node } from '@xyflow/react';
import {
	calculateAND,
	calculateNAND,
	calculateNOR,
	calculateOR,
	calculateXNOR,
	calculateXOR,
} from './gateLogic';

interface Props {
	nodesCopy: Node[];
	edgesCopy: Edge[];
	setNodes: (value: React.SetStateAction<Node<any>[]>) => void;
	setEdges: (value: React.SetStateAction<Edge<any>[]>) => void;
	topologicalSort: (nodes: Node[], edges: Edge[]) => Node[];
}

export function evaluateCircuit({
	nodesCopy,
	edgesCopy,
	setNodes,
	setEdges,
	topologicalSort,
}: Props) {
	const connectedNodes = new Set<string>();
	edgesCopy.forEach(edge => {
		connectedNodes.add(edge.source);
		connectedNodes.add(edge.target);
	});
	const validNodes = nodesCopy.filter(node => connectedNodes.has(node.id));

	const sortedNodes = topologicalSort(validNodes, edgesCopy);

	sortedNodes.forEach(node => {
		if (node.type === 'gateNode') {
			const inputEdges = edgesCopy.filter(edge => edge.target === node.id);
			const inputValues = inputEdges.map(edge => {
				const sourceNode = nodesCopy.find(n => n.id === edge.source);
				return sourceNode?.data?.value === 1;
			});

			let outputValue = 0;

			// Evaluate gate node logic
			if (node.data?.gateType === 'not') {
				outputValue = inputValues[0] === false ? 1 : 0;
			} else if (inputValues.length >= 2) {
				switch (node.data?.gateType) {
					case 'and':
						outputValue = calculateAND(inputValues) ? 1 : 0;
						break;
					case 'or':
						outputValue = calculateOR(inputValues) ? 1 : 0;
						break;
					case 'nand':
						outputValue = calculateNAND(inputValues) ? 1 : 0;
						break;
					case 'nor':
						outputValue = calculateNOR(inputValues) ? 1 : 0;
						break;
					case 'xor':
						outputValue = calculateXOR(inputValues) ? 1 : 0;
						break;
					case 'xnor':
						outputValue = calculateXNOR(inputValues) ? 1 : 0;
						break;
					default:
						outputValue = 0;
				}
			} else {
				outputValue = 0;
			}

			node.data = { ...node.data, value: outputValue };
		}

		if (node.type === 'outputNode') {
			const inputEdge = edgesCopy.find(edge => edge.target === node.id);
			if (inputEdge) {
				const sourceNode = nodesCopy.find(n => n.id === inputEdge.source);
				node.data = { ...node.data, value: sourceNode?.data?.value || 0 };
			} else {
				node.data = { ...node.data, value: 0 };
			}
		}
	});

	// Update edge labels and animations
	edgesCopy.forEach(edge => {
		const sourceNode = nodesCopy.find(n => n.id === edge.source);
		edge.animated = sourceNode?.data?.value === 1;
		edge.label = sourceNode?.data?.value === 1 ? '1' : '0';
	});

	// Set updated nodes and edges in state
	setNodes(nds =>
		nds.map(node => {
			const updatedNode = validNodes.find(n => n.id === node.id);
			return updatedNode ? { ...node, data: updatedNode.data } : node;
		})
	);

	setEdges(edgesCopy);
}
