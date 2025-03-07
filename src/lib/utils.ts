import { clsx, type ClassValue } from 'clsx';
import { CSSProperties } from 'react';
import { twMerge } from 'tw-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function resetNodeStyles(): CSSProperties {
	return {
		background: 'transparent',
		boxShadow: 'none',
		padding: 0,
		border: 'none',
	};
}
