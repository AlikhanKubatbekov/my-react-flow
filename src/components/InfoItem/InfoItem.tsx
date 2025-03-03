import { cn } from '@/lib/utils';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
	title: string;
	url: string;
}

const InfoItem: React.FC<Props> = ({ title, url }) => {
	return (
		<Link to={url}>
			<div
				className={cn(
					'px-2 py-4 border border-slate-300 rounded flex justify-center font-bold hover:-translate-y-1 transition-all cursor-pointer hover:border-slate-600'
				)}
			>
				<p>{title}</p>
			</div>
		</Link>
	);
};

export default InfoItem;
