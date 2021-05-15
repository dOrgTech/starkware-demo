import { AppBar, IconButton, Button, styled, Grid } from '@material-ui/core';
import { ReactComponent as StarkwareLogo } from '../assets/starknet.svg';
import React from 'react';

const StyledAppBar = styled(AppBar)({
	boxShadow: 'unset',
	padding: '0 50px 0 44px',
});

export const Navbar: React.FC = () => {
	return (
		<StyledAppBar position="static" color="transparent">
			<Grid justify="space-between" container alignItems="center">
				<Grid item>
					<IconButton edge="start" aria-label="menu">
						<StarkwareLogo />
					</IconButton>
				</Grid>
				<Grid item>
					<Button color="secondary" variant="outlined">
						Token Balance
					</Button>
				</Grid>
			</Grid>
		</StyledAppBar>
	);
};
