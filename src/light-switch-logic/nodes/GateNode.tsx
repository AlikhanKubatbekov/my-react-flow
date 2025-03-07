import { GateNodeData } from '@/types';
import { Handle, NodeProps, Position } from '@xyflow/react';
import React from 'react';
import { renderGateIcon } from '../helpers/renderGateIcon';
import './node.css';

const GateNode: React.FC<NodeProps<GateNodeData>> = ({ data, selected }) => {
	const icon = renderGateIcon({ data: { gateType: data.gateType as string } });
	const gateType = data.gateType as string;

	return (
		<div
			className={`bg-white p-2 border rounded ${
				selected ? 'border-red-400 hover:border-red-400-red/50' : ''
			}`}
		>
			{data.gateType !== 'not' && (
				<>
					<Handle
						type='target'
						position={Position.Left}
						id='input1'
						style={{ top: '30%' }}
					/>
					<Handle
						type='target'
						position={Position.Left}
						id='input2'
						style={{ top: '70%' }}
					/>
				</>
			)}
			{data.gateType === 'not' && (
				<Handle
					type='target'
					position={Position.Left}
					id='input'
					style={{ top: '50%' }}
				/>
			)}
			<div className='flex items-center space-x-2 text-black'>
				{icon}
				<span>{gateType.toUpperCase()} Gate</span>
			</div>
			<Handle
				type='source'
				position={Position.Right}
				id='output'
				style={{ top: '50%' }}
			/>
		</div>
	);
};

export default GateNode;
