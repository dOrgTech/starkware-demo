import React from 'react';
import { Avatar, AvatarProps, styled } from '@material-ui/core';

export type LogoSize = 'default' | 'medium' | 'large';

export interface TokenIconProps extends AvatarProps {
	icon: string;
	size?: LogoSize;
}

const TokenLogoContainer = styled(Avatar)((props: { dimension: number }) => ({
	width: props.dimension,
	height: props.dimension,
	borderRadius: '100%',
	'& > *': {
		width: '100%',
		height: '100%',
	},
}));

export const TokenIcon: React.FC<TokenIconProps> = React.memo(function component({
	icon,
	size = 'default',
	...props
}) {
	let iconSize: number;

	switch (size) {
		case 'default':
			iconSize = 32;
			break;
		case 'medium':
			iconSize = 48;
			break;
		case 'large':
			iconSize = 66;
			break;
	}

	return (
		<TokenLogoContainer dimension={iconSize} {...props}>
			<img src={icon} alt="token icon" />
		</TokenLogoContainer>
	);
});
