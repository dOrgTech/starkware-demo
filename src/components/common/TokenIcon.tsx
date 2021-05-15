import React from 'react';
import { Avatar, AvatarProps, styled } from '@material-ui/core';
import { useMemo } from 'react';

export type LogoSize = 'default' | 'large';

export interface TokenIconProps extends AvatarProps {
	Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
	size?: LogoSize;
}

const TokenLogoContainer = styled(Avatar)((props: { widthAndHeight: number }) => ({
	width: props.widthAndHeight,
	height: props.widthAndHeight,
	borderRadius: '100%',
	'& > *': {
		width: '100%',
		height: '100%',
	},
}));

export const TokenIcon: React.FC<TokenIconProps> = ({ Icon, size = 'default', ...props }) => {
	const iconSize: number = useMemo(() => {
		switch (size) {
			case 'default':
				return 26;
			case 'large':
				return 48;
		}
	}, [size]);

	return (
		<TokenLogoContainer widthAndHeight={iconSize} {...props}>
			<Icon />
		</TokenLogoContainer>
	);
};
