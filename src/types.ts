import { Node } from '@xyflow/react';

export interface IInputNodeData extends Node<Record<string, unknown>, string> {
	label: string;
	value?: number;
	isDynamic?: boolean;
}
