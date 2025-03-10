import { Handle, HandleProps } from '@xyflow/react';
import styled from 'styled-components';

const StyledHandle = styled(Handle)`
	width: 8px;
	height: 8px;
	background-color: #ccc;
	border-color: #aaa;

	&:hover,
	&:focus,
	&:focus-visible {
		background-color: #999 !important;
		border-color: #777 !important;
		outline: none;
	}

	&.react-flow__handle.connectingfrom {
		border-color: #777;
	}
`;

export const CustomHandle = (props: HandleProps) => {
	return <StyledHandle {...props} />;
};
