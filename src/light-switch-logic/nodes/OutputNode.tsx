import { ReactComponent as LightBulbOff } from '@/assets/icons/light-bulb-off.svg';
import { ReactComponent as LightBulbOn } from '@/assets/icons/light-bulb-on.svg';
import Typography from '@/components/ui/Typography';
import { NodeProps, Position } from '@xyflow/react';
import React, { ReactNode } from 'react';
import { CustomHandle } from '../components/CustomHandle/CustomHandle';
import { CustomNode } from '../components/CustomNode/CustomNode';

const OutputNode: React.FC<NodeProps> = ({ data, selected }) => {
	const isOn = data.value === 1;

	return (
		<CustomNode
			id={data.id as string}
			data={data}
			selected={selected}
			className='!bg-dark'
		>
			<CustomHandle id='a' type='target' position={Position.Left} />
			<div className='flex items-center space-x-2 text-white'>
				{isOn ? (
					<LightBulbOn className='w-10 h-10 text-yellow-500' />
				) : (
					<LightBulbOff className='w-10 h-10 text-gray-500' />
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
		</CustomNode>
	);
};

export default OutputNode;
