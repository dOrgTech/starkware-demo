import React from 'react';
import { Grid, styled, useTheme } from '@material-ui/core';
import { Home } from 'pages/Home';
import { Navbar } from 'components/Navbar';
import { Sidemenu } from 'components/Sidemenu';
import { useMediaQuery } from '@material-ui/core';

const MainContainer = styled(Grid)({
	background:
		'linear-gradient(360deg, #2D2F82 -0.49%, #2B2C78 11.89%, #2A2B76 18.71%, #26276F 38.09%, #202167 70.91%, #16175F 99.22%);',
	width: '100%',
	minHeight: '100vh',
});

function App() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
