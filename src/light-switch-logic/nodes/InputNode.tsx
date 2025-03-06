import { Handle, NodeProps, Position } from '@xyflow/react';
import React, { ReactNode, useEffect, useState } from 'react';

import Typography from '@/components/ui/Typography';
import { InputNodeData } from '@/types';
import { useInputNode } from '../hooks/useInputNode';

const InputNode: React.FC<NodeProps<InputNodeData>> = ({
	id,
	data,
	selected,
}) => {
	const [value, setValue] = useState(data.value || 0);
	const { propagateValue } = useInputNode({
		id,
		data,
		value: value as number,
		setValue,
	});

	useEffect(() => {
		propagateValue(value as number);
	}, []);

	return (
		<div
			className={`p-2 bg-gray-50 border rounded shadow ${
				selected ? 'text-primary-red' : 'border-black'
			}`}
		>
			<Handle id='a' type='source' position={Position.Right} />

			<Typography variant='body2'>{data.label as ReactNode}</Typography>
			<Typography
				variant='body2'
				className={`${
					data.value ? 'text-green-500' : 'text-red-500'
				} p-1 px-2 bg-black rounded-md`}
			>
				{data.value as ReactNode}
			</Typography>
		</div>
	);
};

export default InputNode;
