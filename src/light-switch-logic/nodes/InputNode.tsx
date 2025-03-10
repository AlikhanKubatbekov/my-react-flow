import { NodeProps, Position } from '@xyflow/react';
import React, { memo, ReactNode, useEffect, useState } from 'react';

import Typography from '@/components/ui/Typography';
import { InputNodeData } from '@/types';
import { CustomHandle } from '../components/CustomHandle/CustomHandle';
import { CustomNode } from '../components/CustomNode/CustomNode';
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
		<CustomNode id={id} data={data} selected={selected} className='!bg-dark'>
			<CustomHandle id='a' type='source' position={Position.Right} />

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
					} p-1 px-2 text-center w-6 bg-white rounded-md transition-all`}
				>
					{data.value as ReactNode}
				</Typography>
			</div>
		</CustomNode>
	);
};

export default memo(InputNode);
