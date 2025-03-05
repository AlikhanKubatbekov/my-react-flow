import { Handle, useUpdateNodeInternals } from '@xyflow/react';
import { useCallback, useState } from 'react';

// eslint-disable-next-line react/prop-types
export default function RandomHandleNode({ id }) {
	const updateNodeInternals = useUpdateNodeInternals();
	const [handleCount, setHandleCount] = useState(0);

	const randomizeHandleCount = useCallback(() => {
		setHandleCount(Math.floor(Math.random() * 10));
		updateNodeInternals(id);
	}, [id, updateNodeInternals]);

	return (
		<div
			style={{
				padding: 10,
				border: '1px solid #ddd',
				borderRadius: 5,
				background: '#fff',
			}}
		>
			{Array.from({ length: handleCount }).map((_, index) => (
				<Handle
					key={index}
					type='target'
					position='left'
					id={`handle-${index}`}
					style={{ top: `${20 + index * 10}px` }}
				/>
			))}
			<div>
				<button
					onClick={randomizeHandleCount}
					className='nodrag border border-slate-400 rounded-md p-2'
				>
					Нажми
				</button>
				<p>На этом узле {handleCount} handles.</p>
			</div>
		</div>
	);
}
