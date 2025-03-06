import { Edge, Node } from '@xyflow/react';
import { useCallback } from 'react';

export const topologicalSort = useCallback(
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
