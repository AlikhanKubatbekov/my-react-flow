import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Base from './base/Base';
import Page from './containers/page/Page';
import { cn } from './lib/utils';

const App: React.FC = () => {
	return (
		<div className={cn('max-w-7xl px-10 w-full mx-auto my-5 relative')}>
			<Link to='/' className='z-10 absolute -left-1 lg:-left-4'>
				<button className='flex items-center justify-center w-10 h-10 border rounded-full border-slate-300 hover:border-slate-600 transition-all'>
					&larr;
				</button>
			</Link>
			<Routes>
				<Route path={'/'} element={<Page />} />
				<Route path='/base' element={<Base />} />

				<Route path={'*'} element={<div>404</div>} />
			</Routes>
		</div>
	);
};

export default App;
