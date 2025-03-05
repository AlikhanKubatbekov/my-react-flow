import { Node, NodeTypes } from '@xyflow/react';
import { PositionLoggerNode } from './PositionLoggerNode';

export const initialNodes: Node[] = [
	{ id: 'n-1', position: { x: 0, y: 0 }, data: { label: 'Item 1' } },
	{ id: 'n-2', position: { x: 300, y: 0 }, data: { label: 'Item 2' } },
];

export const nodeTypes = {
	'position-logger': PositionLoggerNode,
	// Add any of your custom nodes here!
} satisfies NodeTypes;
