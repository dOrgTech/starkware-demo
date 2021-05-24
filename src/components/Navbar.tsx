import { AppBar, styled, Grid } from '@material-ui/core';
import React from 'react';
import { TokenBalances } from './TokenBalances';

const StyledAppBar = styled(AppBar)({
	boxShadow: 'unset',
	padding: '32px 50px 0 44px',
});

export const Navbar: React.FC = () => {
	return (
		<StyledAppBar position="static" color="transparent">
			<Grid justify="flex-end" container alignItems="center">
				<Grid item>
					<TokenBalances />
				</Grid>
			</Grid>
		</StyledAppBar>
	);
};
