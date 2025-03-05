import {
	BaseEdge,
	EdgeLabelRenderer,
	EdgeProps,
	getSmoothStepPath,
	useReactFlow,
} from '@xyflow/react';

const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY }: EdgeProps) => {
	const { setEdges } = useReactFlow();
	const [edgePath, labelX, labelY] = getSmoothStepPath({
		sourceX,
		sourceY,
		targetX,
		targetY,
	});

	return (
		<>
			<BaseEdge id={id} path={edgePath} />
			<EdgeLabelRenderer>
				<button
					onClick={() => setEdges(edges => edges.filter(e => e.id !== id))}
					style={{
						position: 'absolute',
						transform: `translate(-120%, -50%) translate(${labelX}px, ${labelY}px)`,
						pointerEvents: 'all',
					}}
					className='cursor-pointer nodrag nopan text-xs border border-gray-300 rounded-md p-1'
				>
					Delete
				</button>
			</EdgeLabelRenderer>
		</>
	);
};

export default CustomEdge;
