import { cn } from '@/lib/utils';
import React, { forwardRef } from 'react';

interface Props
	extends React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	labelClassName?: string;
}

const Switch: React.FC<Props> = forwardRef((props, _) => {
	const { children, labelClassName = '', className = '', ...rest } = props;

	return (
		<label
			className={`inline-flex relative items-center cursor-pointer self-start`}
		>
			<input type='checkbox' {...rest} className='sr-only peer' />
			<div
				className={cn(
					`w-11 h-6 bg-inherit peer-focus:outline-none peer-focus:ring-0 peer-checked:border-0 border rounded-full peer ltr:peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-0 after:content-[''] after:absolute ${
						children ? 'after:top-[5px]' : 'after:top-[2px]'
					} ltr:after:left-[2px] ltr:after:right-unset after:border-0 after:rounded-full after:h-5 after:w-5 after:transition-all after:bg-white peer-checked:bg-customRed border-custom-red`,
					className
				)}
			/>
			<span className={cn(`ltr:ml-3 rtl:mr-3 text-white`, labelClassName)}>
				{children}
			</span>
		</label>
	);
});

Switch.displayName = 'Switch';

export default Switch;
