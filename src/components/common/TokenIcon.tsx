import React from 'react';
import { Avatar, AvatarProps, styled } from '@material-ui/core';
import { useMemo } from 'react';

export type LogoSize = 'default' | 'large';

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

export const TokenIcon: React.FC<TokenIconProps> = ({ icon, size = 'default', ...props }) => {
	const iconSize: number = useMemo(() => {
		switch (size) {
			case 'default':
				return 26;
			case 'large':
				return 48;
		}
	}, [size]);

	return (
		<TokenLogoContainer dimension={iconSize} {...props}>
			<img src={icon} />
		</TokenLogoContainer>
	);
};
