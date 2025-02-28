import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
	title: string;
}

const InfoItem: React.FC<Props> = ({ title }) => {
	return (
		<div className={cn('p-4 bg-blue-500 text-white')}>
			<p>{title}</p>
		</div>
	);
};

export default InfoItem;
