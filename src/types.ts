import { Node } from '@xyflow/react';

export interface InputNodeData extends Node<Record<string, unknown>, string> {
	label: string;
	value?: number;
	isDynamic?: boolean;
}

export interface GateNodeData extends Node<Record<string, unknown>, string> {
	gateType: string;
	value?: number;
}
