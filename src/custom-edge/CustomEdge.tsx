import {
	BaseEdge,
	EdgeProps,
	getSmoothStepPath,
	useReactFlow,
} from '@xyflow/react';

const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY }: EdgeProps) => {
	const { setEdges } = useReactFlow();
	const [edgePath] = getSmoothStepPath({
		sourceX,
		sourceY,
		targetX,
		targetY,
	});

	return (
		<>
			<BaseEdge path={edgePath} />
		</>
	);
};

export default CustomEdge;
