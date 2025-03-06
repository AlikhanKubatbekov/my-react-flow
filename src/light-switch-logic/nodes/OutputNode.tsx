import Typography from '@/components/ui/Typography';
import { Handle, NodeProps, Position } from '@xyflow/react';
import React, { ReactNode } from 'react';

const OutputNode: React.FC<NodeProps> = ({ data, selected }) => {
	const isOn = data.value === 1;

	return (
		<div
			className={`p-2 bg-gray-50 border rounded shadow ${
				selected
					? 'border-primary-red hover:border-primary-red/50'
					: 'border-black'
			}`}
		>
			<Handle id='a' type='target' position={Position.Left} />
			<div className='flex items-center space-x-2'>
				{/* {isOn ? (
					<LightBulbOn className='w-10 h-10 text-yellow-500' />
				) : (
					<LightBulbOff className='w-10 h-10 text-gray-500' />
				)} */}
				<Typography variant='body2'>{data.label as ReactNode}</Typography>
				<Typography
					variant='body2'
					className={`${
						isOn ? 'text-green-500' : 'text-red-500'
					} p-1 px-2 bg-black rounded-md`}
				>
					{data.value as ReactNode}
				</Typography>
			</div>
		</div>
	);
};

export default OutputNode;
