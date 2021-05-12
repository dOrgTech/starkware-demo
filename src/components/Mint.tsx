import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { ReactComponent as ArrowDown } from '../assets/icons/arrow-down.svg';
import { ReactComponent as TokenLogo } from '../assets/tokens/token.svg';

export const Mint = (): JSX.Element => {
	return (
		<Grid container>
			<Grid item container xs>
				<Grid item container spacing={1} xs={8} sm={6} alignItems="center">
					<Grid item>
						<TokenLogo height="48px" width="48px" />
					</Grid>
					<Grid item>
						<Typography variant="h4">TK1</Typography>
					</Grid>
					<Grid item>
						<ArrowDown width="10px" height="5px" />
					</Grid>
				</Grid>
				<Grid container item xs alignItems="center">
					<Typography variant="h4">100</Typography>
				</Grid>
			</Grid>
		</Grid>
	);
};
