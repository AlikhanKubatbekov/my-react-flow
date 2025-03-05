import { Handle, Position } from '@xyflow/react';
import { memo } from 'react';

interface Props {
	data: {
		color: string;
		onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	};
	isConnectable: boolean;
}

export default memo(({ data, isConnectable }: Props) => {
	return (
		<>
			<Handle
				type='target'
				position={Position.Left}
				onConnect={params => console.log('handle onConnect', params)}
				isConnectable={isConnectable}
			/>
			<div>
				Custom Color Picker Node: <strong>{data.color}</strong>
			</div>
			<input
				className='nodrag'
				type='color'
				onChange={data.onChange}
				defaultValue={data.color}
			/>
			<Handle
				type='source'
				position={Position.Right}
				id='a'
				isConnectable={isConnectable}
			/>
			<Handle
				type='source'
				position={Position.Right}
				id='b'
				isConnectable={isConnectable}
			/>
		</>
	);
});
