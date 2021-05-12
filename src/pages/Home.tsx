import React from 'react';
import { Grid, styled, Container } from '@material-ui/core';
import { ModeSelector } from '../components/ModeSelector';

const ModeSelectorContainer = styled(Grid)({
	marginTop: '10%',
});

export const Home = (): JSX.Element => {
	return (
		<Container maxWidth="lg">
			<Grid container justify="center">
				<ModeSelectorContainer item xs={12} sm={8} md={6} lg={5}>
					<ModeSelector />
				</ModeSelectorContainer>
			</Grid>
		</Container>
	);
};
