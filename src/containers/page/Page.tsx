import InfoItem from '@/components/InfoItem/InfoItem';
import { PAGES } from '@/lib/config';
import React from 'react';

const Page: React.FC = () => {
	return (
		<>
			{PAGES.map((page, i) => (
				<InfoItem key={i} title={page.title} />
			))}
		</>
	);
};

export default Page;
