import { Edge, EdgeTypes } from '@xyflow/react';

export const initialEdges: Edge[] = [
	{ id: 'e-1', source: 'n-1', target: 'n-2' },
	{ id: 'e-2', source: 'n-2', target: 'n-1', animated: true },
];

// export function createEdge(id: string, source: string, target: string, animated: boolean = false): Edge {
// return { id, source, target, animated };
// }

export const edgeTypes = {
	// Add your custom edge types here!
} satisfies EdgeTypes;
