import { Handle, NodeProps, Position } from '@xyflow/react';
import React, { memo, ReactNode, useEffect, useState } from 'react';

import Typography from '@/components/ui/Typography';
import { InputNodeData } from '@/types';
import Switch from '../components/Switch/Switch';
import { useInputNode } from '../hooks/useInputNode';

const InputNode: React.FC<NodeProps<InputNodeData>> = ({
	id,
	data,
	selected,
}) => {
	const [value, setValue] = useState(data.value || 0);
	const { propagateValue, toggleSwitch } = useInputNode({
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
			className={`p-2 bg-dark border rounded shadow border-white ${
				selected
					? 'border-red-500 hover:border-custom-red-red/50'
					: 'border-black'
			} transition-all`}
		>
			<Handle id='a' type='source' position={Position.Right} />

			<div className='flex items-center gap-2 text-white'>
				{data.isDynamic ? (
					<Switch checked={value === 1} onChange={toggleSwitch} />
				) : (
					<></>
				)}
				<Typography variant='body2' className='text-inherit'>
					{data.label as ReactNode}
				</Typography>
				<Typography
					variant='body2'
					className={`${
						data.value ? 'text-green-500' : 'text-red-500'
					} p-1 px-2 text-center w-6 bg-white rounded-md`}
				>
					{data.value as ReactNode}
				</Typography>
			</div>
		</div>
	);
};

export default memo(InputNode);
