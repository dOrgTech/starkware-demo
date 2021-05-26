import {
	AppBar,
	styled,
	Grid,
	SwipeableDrawer,
	IconButton,
	useMediaQuery,
	useTheme,
} from '@material-ui/core';
import React, { useState } from 'react';
import { Sidemenu } from './Sidemenu';
import { TokenBalances } from './TokenBalances';
import MenuIcon from '@material-ui/icons/Menu';
import Starknet from 'assets/starknet.svg';

const StyledAppBar = styled(AppBar)({
	boxShadow: 'unset',
	padding: '32px 50px 0 44px',
});

const StarkNetLogo = styled('img')({
	width: 196,
	height: 39,
	margin: 'auto',
});

const MenuBar = styled(Grid)({
	width: 'calc(100% + 40px)',
	margin: '-10px -10px 0 -10px',
});

export const Navbar: React.FC = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const [open, setOpen] = useState(false);

	return (
		<>
			<StyledAppBar position="static" color="transparent">
				<SwipeableDrawer
					anchor={'left'}
					open={open}
					onClose={() => setOpen(false)}
					onOpen={() => setOpen(true)}
				>
					<Sidemenu />
				</SwipeableDrawer>
				{isMobile && (
					<MenuBar container justify="space-between">
						<Grid item>
							<StarkNetLogo src={Starknet} />
						</Grid>
						<Grid item>
							<IconButton color="primary" size="medium" onClick={() => setOpen(!open)}>
								<MenuIcon />
							</IconButton>
						</Grid>
					</MenuBar>
				)}
				<Grid justify={isMobile ? 'space-between' : 'flex-end'} container alignItems="center">
					<Grid item>
						<TokenBalances />
					</Grid>
				</Grid>
			</StyledAppBar>
		</>
	);
};
