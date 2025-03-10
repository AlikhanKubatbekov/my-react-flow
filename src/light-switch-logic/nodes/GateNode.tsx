import { GateNodeData } from '@/types';
import { NodeProps, Position } from '@xyflow/react';
import React from 'react';
import { CustomHandle } from '../components/CustomHandle/CustomHandle';
import { CustomNode } from '../components/CustomNode/CustomNode';
import { renderGateIcon } from '../helpers/renderGateIcon';

const GateNode: React.FC<NodeProps<GateNodeData>> = ({ data, selected }) => {
	const icon = renderGateIcon({ data: { gateType: data.gateType as string } });
	const gateType = data.gateType as string;

	return (
		<CustomNode
			id={data.id as string}
			className='!bg-white'
			data={data}
			selected={selected}
		>
			{data.gateType !== 'not' && (
				<>
					<CustomHandle
						type='target'
						position={Position.Left}
						id='input1'
						style={{ top: '30%' }}
					/>
					<CustomHandle
						type='target'
						position={Position.Left}
						id='input2'
						style={{ top: '70%' }}
					/>
				</>
			)}
			{data.gateType === 'not' && (
				<CustomHandle
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
			<CustomHandle
				type='source'
				position={Position.Right}
				id='output'
				style={{ top: '50%' }}
			/>
		</CustomNode>
	);
};

export default GateNode;
