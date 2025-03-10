import { cn } from '@/lib/utils';
import React from 'react';
import styled from 'styled-components';

const StyledNode = styled.div<{ selectable?: boolean; dragging?: boolean }>`
	&.react-flow__node {
		padding: 0 !important;
	}
`;

interface CustomNodeProps {
	id: string;
	data: Record<string, unknown>;
	selected: boolean;
	children?: React.ReactNode;
	className?: string;
	type?: string;
	dragging?: boolean;
	zIndex?: number;
	selectable?: boolean;
	deletable?: boolean;
	[key: string]: any;
}

export const CustomNode = ({
	id,
	data,
	selected,
	children,
	className = '',
	...props
}: CustomNodeProps) => {
	return (
		<StyledNode
			className={cn(
				'react-flow__node !p-2 !border !rounded !shadow',
				selected
					? '!border-custom-red !hover:border-red-500/50'
					: '!border-white',
				'!transition-all',
				className
			)}
			{...props}
		>
			{children}
		</StyledNode>
	);
};
