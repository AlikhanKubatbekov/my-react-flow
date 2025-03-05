import { BaseEdge } from '@xyflow/react';

// eslint-disable-next-line react/prop-types
const StepEdge = ({ sourceX, sourceY, targetX, targetY }) => {
	const path = `M ${sourceX} ${sourceY} L ${targetX} ${sourceY} L ${targetX} ${targetY}`;

	return <BaseEdge path={path} />;
};

export default StepEdge;
