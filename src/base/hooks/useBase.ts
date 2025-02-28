import { initialEdges } from '@/base/edges/edges';
import { initialNodes } from '@/base/nodes/nodes';
import {
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
	EdgeChange,
	NodeChange,
	OnConnect,
	useEdgesState,
	useNodesState,
} from '@xyflow/react';
import { useCallback } from 'react';

export function useBase() {
	const [nodes, setNodes] = useNodesState(initialNodes);
	const [edges, setEdges] = useEdgesState(initialEdges);

	const onNodesChange = useCallback(
		(changes: NodeChange[]) => setNodes(nds => applyNodeChanges(changes, nds)),
		[setNodes]
	);

	const onEdgesChange = useCallback(
		(changes: EdgeChange[]) => setEdges(eds => applyEdgeChanges(changes, eds)),
		[setEdges]
	);

	const onConnect: OnConnect = useCallback(
		connection => {
			setEdges(edges => addEdge(connection, edges));
		},
		[setEdges]
	);

	return { nodes, edges, onNodesChange, onEdgesChange, onConnect };
}
