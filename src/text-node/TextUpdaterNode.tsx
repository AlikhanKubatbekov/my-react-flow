import { Handle, Position } from '@xyflow/react';
import React, { ChangeEvent, useCallback } from 'react';

const TextUpdaterNode: React.FC = () => {
	const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		//some action

		console.log(e.target.value);
	}, []);

	return (
		<>
			<div className='p-2 h-12 rounded-md bg-white'>
				<Handle type='target' position={Position.Top} />
				<div>
					<form>
						<label htmlFor='text' className='text-gray-400 block text-left'>
							Text:
						</label>
						<input
							autoComplete='off'
							id='text'
							type='text'
							name='text'
							onChange={onChange}
							className='nodrag border border-black rounded-md p-1'
						/>
						<button type='submit' className='ml-2 border p-1 rounded-md'>
							Submit
						</button>
					</form>
				</div>

				<Handle
					id='a'
					type='source'
					position={Position.Bottom}
					className='left-3'
				/>
				<Handle id='b' type='source' position={Position.Bottom} />
			</div>
		</>
	);
};

export default TextUpdaterNode;
