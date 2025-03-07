import { ReactComponent as LogicGateAnd } from '@/assets/icons/logic-gate-and.svg';
import { ReactComponent as LogicGateNand } from '@/assets/icons/logic-gate-nand.svg';
import { ReactComponent as LogicGateNor } from '@/assets/icons/logic-gate-nor.svg';
import { ReactComponent as LogicGateNot } from '@/assets/icons/logic-gate-not.svg';
import { ReactComponent as LogicGateOr } from '@/assets/icons/logic-gate-or.svg';
import { ReactComponent as LogicGateXnor } from '@/assets/icons/logic-gate-xnor.svg';
import { ReactComponent as LogicGateXor } from '@/assets/icons/logic-gate-xor.svg';
import { GateNodeData } from '@/types';

export function renderGateIcon({
	data,
}: {
	data: { gateType: GateNodeData['gateType'] };
}) {
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
}
