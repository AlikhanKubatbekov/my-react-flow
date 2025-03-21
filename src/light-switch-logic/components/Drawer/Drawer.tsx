import { ReactComponent as Arrow } from '@/assets/icons/arrow.svg';
import { ReactComponent as LightBulbOff } from '@/assets/icons/light-bulb-off.svg';
import { ReactComponent as LogicGateAnd } from '@/assets/icons/logic-gate-and.svg';
import { ReactComponent as LogicGateNand } from '@/assets/icons/logic-gate-nand.svg';
import { ReactComponent as LogicGateNor } from '@/assets/icons/logic-gate-nor.svg';
import { ReactComponent as LogicGateNot } from '@/assets/icons/logic-gate-not.svg';
import { ReactComponent as LogicGateOr } from '@/assets/icons/logic-gate-or.svg';
import { ReactComponent as LogicGateXnor } from '@/assets/icons/logic-gate-xnor.svg';
import { ReactComponent as LogicGateXor } from '@/assets/icons/logic-gate-xor.svg';
import Button from '@/components/ui/Button';

import Typography from '@/components/ui/Typography';
import React, { useState } from 'react';

interface DrawerProps {
	isOpen: boolean;
	onClose: () => void;
	addNode: (nodeType: string, gateType?: string) => void;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, addNode }) => {
	const [sections, setSections] = useState({
		inputs: false,
		gates: false,
		outputs: false,
	});

	const toggleSection = (section: keyof typeof sections) => {
		setSections(prevState => ({
			...prevState,
			[section]: !prevState[section],
		}));
	};

	return (
		<>
			<div
				className={`fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity ${
					isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
				}`}
				onClick={onClose}
			></div>
			<div
				className={`fixed inset-y-0 left-0 w-64 md:rounded-l-10 dark:bg-backgroundDark bg-dark p-4 z-10 transition-transform transform ${
					isOpen ? 'translate-x-0' : '-translate-x-full'
				} md:translate-x-0 md:relative md:flex md:flex-col`}
			>
				<aside className='md:w-[240px] p-4 bg-transparent max-h-full overflow-y-auto text-white'>
					<Typography variant='h4' className='mb-2 text-inherit'>
						Elements
					</Typography>
					<Typography variant='caption' className='mb-2 text-inherit'>
						Click on the titles to expand and add elements to the canvas.
					</Typography>

					{/* Inputs Section */}
					<div
						onClick={() => toggleSection('inputs')}
						className='flex items-center justify-between cursor-pointer text-black dark:text-white mt-4 mb-2'
					>
						<Typography
							variant='body2'
							fontweight='bold'
							textTransform='uppercase'
							className='text-inherit'
						>
							Inputs
						</Typography>
						<Arrow
							className={`w-4 h-4 transition-all duration-300 ease-in-out ${
								sections.inputs ? 'rotate-[270deg]' : 'rotate-90'
							}`}
						/>
					</div>
					<div
						className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
							sections.inputs ? 'max-h-[500px]' : 'max-h-0'
						}`}
					>
						<Button
							className='w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center justify-center mb-2'
							onClick={() => addNode('inputNode')}
						>
							<Typography variant='body2' className='text-white'>
								Add Dynamic Input
							</Typography>
						</Button>
						<Button
							className='w-full bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded flex items-center justify-center mb-2'
							onClick={() => addNode('inputNode', 'low')}
						>
							<Typography variant='body2' className='text-white'>
								Add Low (0)
							</Typography>
						</Button>
						<Button
							className='w-full bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-4 rounded flex items-center justify-center mb-2'
							onClick={() => addNode('inputNode', 'high')}
						>
							<Typography variant='body2' className='text-white'>
								Add High (1)
							</Typography>
						</Button>
					</div>

					{/* Gates Section */}
					<div
						onClick={() => toggleSection('gates')}
						className='flex items-center justify-between cursor-pointer text-black dark:text-white mt-4 mb-2'
					>
						<Typography
							variant='body2'
							fontweight='bold'
							textTransform='uppercase'
							className='text-inherit'
						>
							Gates
						</Typography>
						<Arrow
							className={`w-4 h-4 transition-all duration-300 ease-in-out ${
								sections.gates ? 'rotate-[270deg]' : 'rotate-90'
							}`}
						/>
					</div>
					<div
						className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
							sections.gates ? 'max-h-[500px]' : 'max-h-0'
						}`}
					>
						<Button
							className='w-full bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded flex items-center justify-center mb-2'
							onClick={() => addNode('gateNode', 'and')}
						>
							<LogicGateAnd className='mr-2 w-6 h-6' />
							<Typography variant='body2' className='text-white'>
								Add AND Gate
							</Typography>
						</Button>
						<Button
							className='w-full bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded flex items-center justify-center mb-2'
							onClick={() => addNode('gateNode', 'or')}
						>
							<LogicGateOr className='mr-2 w-6 h-6' />
							<Typography variant='body2' className='text-white'>
								Add OR Gate
							</Typography>
						</Button>
						<Button
							className='w-full bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 rounded flex items-center justify-center mb-2'
							onClick={() => addNode('gateNode', 'not')}
						>
							<LogicGateNot className='mr-2 w-6 h-6' />
							<Typography variant='body2' className='text-white'>
								Add NOT Gate
							</Typography>
						</Button>
						<Button
							className='w-full bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded flex items-center justify-center mb-2'
							onClick={() => addNode('gateNode', 'nand')}
						>
							<LogicGateNand className='mr-2 w-6 h-6' />
							<Typography variant='body2' className='text-white'>
								Add NAND Gate
							</Typography>
						</Button>
						<Button
							className='w-full bg-pink-500 hover:bg-pink-700 text-white py-2 px-4 rounded flex items-center justify-center mb-2'
							onClick={() => addNode('gateNode', 'nor')}
						>
							<LogicGateNor className='mr-2 w-6 h-6' />
							<Typography variant='body2' className='text-white'>
								Add NOR Gate
							</Typography>
						</Button>
						<Button
							className='w-full bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 rounded flex items-center justify-center mb-2'
							onClick={() => addNode('gateNode', 'xor')}
						>
							<LogicGateXor className='mr-2 w-6 h-6' />
							<Typography variant='body2' className='text-white'>
								Add XOR Gate
							</Typography>
						</Button>
						<Button
							className='w-full bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded flex items-center justify-center mb-2'
							onClick={() => addNode('gateNode', 'xnor')}
						>
							<LogicGateXnor className='mr-2 w-6 h-6' />
							<Typography variant='body2' className='text-white'>
								Add XNOR Gate
							</Typography>
						</Button>
					</div>

					{/* Outputs Section */}
					<div
						onClick={() => toggleSection('outputs')}
						className='flex items-center justify-between cursor-pointer text-black dark:text-white mt-4 mb-2'
					>
						<Typography
							variant='body2'
							fontweight='bold'
							textTransform='uppercase'
							className='text-inherit'
						>
							Outputs
						</Typography>
						<Arrow
							className={`w-4 h-4 transition-all duration-300 ease-in-out ${
								sections.outputs ? 'rotate-[270deg]' : 'rotate-90'
							}`}
						/>
					</div>
					<div
						className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
							sections.outputs ? 'max-h-[500px]' : 'max-h-0'
						}`}
					>
						<Button
							variant='contained'
							className='w-full text-white py-2 px-4 rounded flex items-center justify-center mb-2'
							onClick={() => addNode('outputNode')}
						>
							<LightBulbOff className='mr-2 w-6 h-6' />
							<Typography variant='body2' className='text-white'>
								Add Output (Lamp)
							</Typography>
						</Button>
					</div>
				</aside>
			</div>
		</>
	);
};

export default Drawer;
