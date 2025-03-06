import { ReactComponent as LogicGateAnd } from '@/assets/icons/logic-gate-and.svg';
import { ReactComponent as LogicGateNand } from '@/assets/icons/logic-gate-nand.svg';
import { ReactComponent as LogicGateNor } from '@/assets/icons/logic-gate-nor.svg';
import { ReactComponent as LogicGateNot } from '@/assets/icons/logic-gate-not.svg';
import { ReactComponent as LogicGateOr } from '@/assets/icons/logic-gate-or.svg';
import { ReactComponent as LogicGateXnor } from '@/assets/icons/logic-gate-xnor.svg';
import { ReactComponent as LogicGateXor } from '@/assets/icons/logic-gate-xor.svg';
import { Handle, Node, NodeProps, Position } from '@xyflow/react';
import React from 'react';

interface GateNodeData extends Node<Record<string, unknown>, string> {
	gateType: string;
	value?: number;
}

const GateNode: React.FC<NodeProps<GateNodeData>> = ({ data, selected }) => {
	const renderIcon = () => {
		switch (data.gateType) {
			case 'and':
				return <LogicGateAnd className='w-8 h-8' />;
			case 'or':
				return <LogicGateOr className='w-8 h-8' />;
			case 'not':
				return <LogicGateNot className='w-8 h-8' />;
			case 'nand':
				return <LogicGateNand className='w-8 h-8' />;
			case 'nor':
				return <LogicGateNor className='w-8 h-8' />;
			case 'xor':
				return <LogicGateXor className='w-8 h-8' />;
			case 'xnor':
				return <LogicGateXnor className='w-8 h-8' />;
			default:
				return null;
		}
	};

	return (
		<div
			className={`bg-white p-2 border rounded shadow ${
				selected ? 'border-primary-red hover:border-primary-red/50' : ''
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
				{renderIcon()}
				<span>{data.gateType.toUpperCase()} Gate</span>
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
