import {
	addEdge,
	OnConnect,
	useEdgesState,
	useNodesState,
} from '@xyflow/react';
import { useCallback } from 'react';
import { initialEdges } from '../edges/edges';
import { initialNodes } from '../nodes/nodes';

export function useApp() {
	const [nodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

	console.log(nodes);
	console.log(edges);

	const onConnect: OnConnect = useCallback(
		connection => {
			setEdges(edges => addEdge(connection, edges)), console.log(connection);
		},
		[setEdges]
	);

	return { onNodesChange, onEdgesChange, onConnect };
}
