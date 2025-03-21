import { cn } from '@/lib/utils';
import { useMemo } from 'react';

interface IProps
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLParagraphElement>,
		HTMLParagraphElement
	> {
	variant?:
		| 'h1'
		| 'h2'
		| 'h3'
		| 'h4'
		| 'base'
		| 'body1'
		| 'body2'
		| 'caption'
		| 'caption2';
	fontweight?:
		| 'extraLight'
		| 'light'
		| 'regular'
		| 'medium'
		| 'semiBold'
		| 'bold'
		| 'extraBold';
	fontStyle?: 'normal' | 'italic';
	textTransform?:
		| 'capitalize'
		| 'lowercase'
		| 'uppercase'
		| 'initial'
		| 'first-letter-capital';
	color?: 'default' | 'gray';
	isSensitive?: boolean;
}

const Typography: React.FC<IProps> = props => {
	const {
		children,
		fontweight = 'regular',
		variant = 'base',
		textTransform = 'initial',
		fontStyle = 'normal',
		color = 'default',
		isSensitive = false,
		className = '',
		...rest
	} = props;

	const fontSize = useMemo(() => {
		switch (variant) {
			case 'h1':
				return 'text-h1_sm md:text-h1_md lg:text-h1';
			case 'h2':
				return 'text-h2_sm md:text-h2';
			case 'h3':
				return 'text-h3_sm md:text-h3';
			case 'h4':
				return 'text-h4';
			case 'base':
				return 'text-base';
			case 'body1':
				return 'text-body1';
			case 'body2':
				return 'text-body2';
			case 'caption':
				return 'text-caption';
			case 'caption2':
				return 'text-caption2';
			default:
				return 'text-base';
		}
	}, [variant]);

	const textTransformAttr = useMemo(() => {
		switch (textTransform) {
			case 'capitalize':
				return 'capitalize';
			case 'initial':
				return 'normal-case';
			case 'lowercase':
				return 'lowercase';
			case 'uppercase':
				return 'uppercase';
			case 'first-letter-capital':
				return '[&::first-letter]:capitalize';

			default:
				return 'normal-case';
		}
	}, [textTransform]);

	const colorAttr = useMemo(() => {
		switch (color) {
			case 'default':
				return 'text-black';
			case 'gray':
				return 'text-gray-700';

			default:
				return 'text-black';
		}
	}, [color]);

	const fontweightAttr = useMemo(() => {
		switch (fontweight) {
			case 'extraLight':
				return 'font-extraLight';
			case 'light':
				return 'font-light';
			case 'regular':
				return 'font-regular';
			case 'medium':
				return 'font-medium';
			case 'semiBold':
				return 'font-semiBold';
			case 'bold':
				return 'font-bold';
			case 'extraBold':
				return 'font-extraBold';
			default:
				return 'font-regular';
		}
	}, [fontweight]);

	const fontStyleAttr = useMemo(() => {
		switch (fontStyle) {
			case 'normal':
				return 'not-italic';
			case 'italic':
				return 'italic';
			default:
				return 'not-italic';
		}
	}, [fontweight]);

	return (
		<p
			className={`${
				isSensitive ? 'bg-gray-100 rounded-md' : ''
			} ${fontSize} ${fontweightAttr} ${fontStyleAttr} ${cn(
				`${colorAttr} transition-all ease-in-out duration-200 relative ${textTransformAttr}`,
				className
			)}`}
			{...rest}
		>
			{children}
			{isSensitive && (
				<span className='w-full h-full absolute top-0 left-0 rounded-md backdrop-blur-md' />
			)}
		</p>
	);
};

export default Typography;
