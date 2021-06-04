import React from 'react';
import { Grid, styled, useTheme } from '@material-ui/core';
import { Home } from 'pages/Home';
import { Navbar } from 'components/Navbar';
import { ActionTypes, NotificationsContext } from './context/notifications';
import { Sidemenu } from 'components/Sidemenu';
import { useMediaQuery } from '@material-ui/core';
import { useAccountBalance } from './services/API/queries/useAccountBalance';

const MainContainer = styled(Grid)({
	background:
		'linear-gradient(360deg, #2D2F82 -0.49%, #2B2C78 11.89%, #2A2B76 18.71%, #26276F 38.09%, #202167 70.91%, #16175F 99.22%);',
	width: '100%',
	minHeight: '100vh',
});

function App() {
	const { dispatch } = React.useContext(NotificationsContext);
	const { isLoading } = useAccountBalance();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const isFirstRender = React.useRef(true);

	React.useEffect(() => {
		if (isLoading && isFirstRender.current) {
			isFirstRender.current = false;
			dispatch({ type: ActionTypes.SHOW_LOADING });
		} else {
			dispatch({ type: ActionTypes.HIDE_LOADING });
		}
	}, [dispatch, isLoading]);

	return (
		<MainContainer container>
			{!isMobile && (
				<Grid item>
					<Sidemenu />
				</Grid>
			)}
			<Grid item xs>
				<Grid container direction="column">
					<Grid item>
						<Navbar />
					</Grid>
					<Grid>
						<Home />
					</Grid>
				</Grid>
			</Grid>
		</MainContainer>
	);
}

export default App;
