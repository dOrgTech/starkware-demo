import { Grid, Link, styled, Typography } from '@material-ui/core';
import Star from 'assets/menu/Star.svg';
import Block from 'assets/menu/Block.svg';
import Document from 'assets/menu/Document.svg';
import Download from 'assets/menu/Download.svg';
import Starkware from 'assets/menu/Starkware.svg';
import Starknet from 'assets/starknet.svg';
import hexToRgba from 'hex-to-rgba';
import React from 'react';

const StyledContainer = styled(Grid)({
	height: '100%',
	width: 277,
	background: hexToRgba('#535387', 0.28),
});

interface MenuLink {
	label: string;
	icon: string;
	url: string;
}

const MenuItem = styled(Grid)({
	width: 230,
});

const MenuItemText = styled(Typography)({
	display: 'inline-block',
});

const MenuIcon = styled('img')({
	width: 15,
	height: 15,
	marginRight: 12,
});

const links: MenuLink[] = [
	{ label: 'What is StarkNet?', icon: Star, url: '/' },
	{ label: 'Block Explorer', icon: Block, url: '/' },
	{ label: 'Documentation', icon: Document, url: '/' },
	{ label: 'Downloads', icon: Download, url: '/' },
	{ label: 'StarkWare', icon: Starkware, url: '/' },
];

const MenuItems = styled(Grid)({
	maxWidth: '100%',
});

const LogoContainer = styled(Grid)({
	width: '100%',
	height: 115,
});

const StarkNetLogo = styled('img')({
	width: 196,
	height: 39,
	margin: 'auto',
});

export const Sidemenu: React.FC = () => {
	return (
		<StyledContainer container direction="column" alignItems="center">
			<LogoContainer item container justify="center" alignItems="center">
				<StarkNetLogo src={Starknet} />
			</LogoContainer>
			<MenuItems item container spacing={5} direction="column" alignItems="center">
				{links.map(({ label, icon, url }, i) => (
					<MenuItem item key={`menulink-${i}`}>
						<Link href={url}>
							<MenuIcon src={icon} />
							<MenuItemText variant="h5">{label}</MenuItemText>
						</Link>
					</MenuItem>
				))}
			</MenuItems>
		</StyledContainer>
	);
};
