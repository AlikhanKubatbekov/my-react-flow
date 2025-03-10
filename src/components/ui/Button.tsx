import { cn } from '@/lib/utils';

interface IProps
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	variant?: 'default' | 'bordered' | 'contained';
	isPrimaryColor?: boolean;
	bgMode?: 'gradient' | 'default';
}

const Button: React.FC<IProps> = props => {
	const {
		children,
		variant = 'default',
		isPrimaryColor = true,
		bgMode = 'default',
		disabled = false,
		className = '',
		...rest
	} = props;
	const variantAttr = () => {
		switch (variant) {
			case 'default':
				return `bg-inherit border-none`;
			case 'bordered':
				return `${
					isPrimaryColor
						? `border border-custom-red hover:border-custom-red/50 bg-transparent`
						: 'border bg-transparent'
				}`;
			case 'contained':
				return `border-none ${
					isPrimaryColor
						? `${
								bgMode === 'default'
									? `bg-custom-red `
									: `bg-gradient-to-r from-[rgb(245,60,43)] to-[rgb(245,60,43)]`
						  }`
						: ''
				}`;
			default:
				return `border-none ${
					isPrimaryColor
						? `${
								bgMode === 'default'
									? 'bg-custom-red'
									: 'bg-gradient-to-r from-[rgb(245,60,43)] to-[rgb(245,60,43)]'
						  }`
						: ''
				}`;
		}
	};

	return (
		<button
			className={cn(
				`flex items-center justify-center transition-all duration-200 ease-in-out rounded-10 py-2 px-8 ${
					disabled
						? 'dark:bg-customGray bg-customGrayDark'
						: `hover:scale-[1.02] ${variantAttr()}`
				}`,
				className
			)}
			disabled={disabled}
			{...rest}
		>
			{children}
		</button>
	);
};

export default Button;
