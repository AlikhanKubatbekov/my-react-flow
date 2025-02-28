import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Page from './containers/page/Page';

const App: React.FC = () => {
	return (
		<Routes>
			<Route path={'/'} element={<Page />} />

			<Route path={'*'} element={<div>404</div>} />
		</Routes>
	);
};

export default App;
