import { ReactComponent as LightBulbOff } from '@/assets/icons/light-bulb-off.svg';
import { ReactComponent as LightBulbOn } from '@/assets/icons/light-bulb-on.svg';
import Typography from '@/components/ui/Typography';
import { Handle, NodeProps, Position } from '@xyflow/react';
import React, { ReactNode } from 'react';

const OutputNode: React.FC<NodeProps> = ({ data, selected }) => {
	const isOn = data.value === 1;

	return (
		<div
			className={`p-2 bg-dark border rounded shadow ${
				selected
					? 'border-custom-red hover:border-custom-red-red/50'
					: 'border-white'
			}`}
		>
			<Handle id='a' type='target' position={Position.Left} />
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
		</div>
	);
};

export default OutputNode;
