import {
	AppBar,
	styled,
	Grid,
	SwipeableDrawer,
	IconButton,
	useMediaQuery,
	useTheme,
	Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { Sidemenu } from './Sidemenu';
import { TokenBalances } from './TokenBalances';
import MenuIcon from '@material-ui/icons/Menu';
import { StarknetLogo } from './common/StarknetLogo';

const StyledAppBar = styled(AppBar)({
	boxShadow: 'unset',
	padding: '32px 50px 0 44px',
	alignItems: 'center',
});

const MenuBar = styled(Grid)({
	width: 'calc(100% + 40px)',
	margin: '-10px -10px 30px -10px',
	alignItems: 'center',
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
							<StarknetLogo />
						</Grid>
						<Grid item>
							<IconButton color="primary" size="medium" onClick={() => setOpen(!open)}>
								<MenuIcon />
							</IconButton>
						</Grid>
					</MenuBar>
				)}
				<Grid
					justify={isMobile ? 'center' : 'space-between'}
					container
					alignItems="center"
					spacing={1}
				>
					<Grid item>
						<Typography>Example Contract - Simple AMM</Typography>
					</Grid>
					<Grid item>
						<TokenBalances />
					</Grid>
				</Grid>
			</StyledAppBar>
		</>
	);
};
