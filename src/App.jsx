import { Link, Route, Routes } from 'react-router-dom';
import Base from './containers/base/Base';
import FlowWithEdgeSelector from './containers/custom-edge/CustomEdgeFlow';
import CustomNodeFlow from './containers/custom-node/CustomNodeFlow';
import CustomStepEdgeFlow from './containers/custom-step-edge/CustomStepEdgeFlow';
import Page from './containers/page/Page';
import RandomHandleFlow from './containers/random-handle-node/RandomHandleFlow';
import TextNodeFlow from './containers/text-node/TextNodeFlow';
import { cn } from './lib/utils';
import LightSwitchFlow from './light-switch-logic/LightSwitchFlow';

const App = () => {
	return (
		<div className={cn('max-w-[1400px] px-10 w-full mx-auto my-5 relative')}>
			<Link to='/' className='z-10 absolute -left-1 lg:-left-4'>
				<button className='flex items-center justify-center w-10 h-10 border rounded-full border-slate-300 hover:border-slate-600 transition-all'>
					&larr;
				</button>
			</Link>

			<Routes>
				<Route path={'/'} element={<Page />} />
				<Route path={'/base'} element={<Base />} />
				<Route path={'/custom-node'} element={<CustomNodeFlow />} />
				<Route path={'/text-node'} element={<TextNodeFlow />} />
				<Route path={'/custom-edge'} element={<FlowWithEdgeSelector />} />
				<Route path={'/random-handle-node'} element={<RandomHandleFlow />} />
				<Route path={'/custom-step-edge'} element={<CustomStepEdgeFlow />} />
				<Route path={'light-switch'} element={<LightSwitchFlow />} />

				<Route path={'*'} element={<div>404</div>} />
			</Routes>
		</div>
	);
};

export default App;
