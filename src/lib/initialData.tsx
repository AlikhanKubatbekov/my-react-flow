import { Edge, Node, Position } from '@xyflow/react';

export const initialNodes: Node[] = [
	{
		id: '1',
		type: 'inputNode',
		data: {
			label: 'Input',
			value: 0,
			isDynamic: true,
		},
		position: { x: 300, y: 5 },
		sourcePosition: Position.Right,
	},
	{
		id: '2',
		type: 'inputNode',
		data: {
			label: 'Input',
			value: 0,
			isDynamic: true,
		},
		position: { x: 300, y: 100 },
		sourcePosition: Position.Right,
	},
	{
		id: '3',
		type: 'gateNode',
		data: {
			gateType: 'and',
			value: 0,
			label: 'AND Gate',
		},
		position: { x: 450, y: 50 },
		targetPosition: Position.Left,
		sourcePosition: Position.Right,
	},
	{
		id: '4',
		type: 'outputNode',
		data: {
			label: 'Lamp',
			value: 0,
		},
		position: { x: 600, y: 50 },
		targetPosition: Position.Left,
	},
];

export const initialEdges: Edge[] = [
	{
		id: 'e1-3',
		source: '1',
		target: '3',
		sourceHandle: 'a',
		targetHandle: 'input1',
		animated: false,
		label: '0',
	},
	{
		id: 'e2-3',
		source: '2',
		target: '3',
		sourceHandle: 'a',
		targetHandle: 'input2',
		animated: false,
		label: '0',
	},
	{
		id: 'e3-4',
		source: '3',
		target: '4',
		sourceHandle: 'output',
		targetHandle: 'a',
		animated: false,
		label: '0',
	},
];
