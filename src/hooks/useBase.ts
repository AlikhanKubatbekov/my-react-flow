import {
	addEdge,
	OnConnect,
	useEdgesState,
	useNodesState,
} from '@xyflow/react';
import { useCallback } from 'react';
import { initialEdges } from '../edges/edges';
import { initialNodes } from '../nodes/nodes';

export function useBase() {
	const [nodes, , onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

	const onConnect: OnConnect = useCallback(
		connection => {
			setEdges(edges => addEdge(connection, edges));
		},
		[setEdges]
	);

	return { nodes, edges, onNodesChange, onEdgesChange, onConnect };
}
