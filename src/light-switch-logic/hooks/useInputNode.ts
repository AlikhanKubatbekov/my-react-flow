import { InputNodeData } from '@/types';
import { useReactFlow } from '@xyflow/react';

interface Props {
	id: InputNodeData['id'];
	data: InputNodeData['data'];
	value: number;
	setValue: (value: React.SetStateAction<number>) => void;
}

export function useInputNode({ id, data, setValue, value }: Props) {
	const reactFlowInstance = useReactFlow();

	const propagateValue = (newValue: number) => {
		setValue(newValue);
		data.value = newValue;

		reactFlowInstance.setNodes(nodes =>
			nodes.map(node => {
				if (node.id === id) {
					return { ...node, data: { ...node.data, value: newValue } };
				}
				return node;
			})
		);
	};

	const toggleSwitch = () => {
		if (data.isDynamic) {
			const newValue = value === 0 ? 1 : 0;
			propagateValue(newValue);
		}
	};

	return { propagateValue, toggleSwitch };
}
