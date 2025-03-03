import InfoItem from '@/components/InfoItem/InfoItem';
import { PAGES } from '@/lib/config';
import { cn } from '@/lib/utils';
import React from 'react';

const Page: React.FC = () => {
	return (
		<div
			className={cn(
				'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 lg:grid-cols-5 lg:gap-4'
			)}
		>
			{PAGES.map((page, i) => (
				<InfoItem key={i} title={page.title} url={page.url} />
			))}
		</div>
	);
};

export default Page;
