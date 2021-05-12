import { Button, createStyles, Grid, makeStyles, styled } from '@material-ui/core';
import React from 'react';
import { DarkBox } from './common/DarkBox';
import { TokenIcon } from './common/TokenIcon';
import { NumericInput } from './NumericInput';
import { ReactComponent as TokenSVG } from 'assets/tokens/token.svg';

const InputsContainer = styled(Grid)({
	padding: '0 0 0 12px',
});

const useButtonStyles = makeStyles(() =>
	createStyles({
		root: {
			borderRadius: 50,
		},
		label: {
			fontSize: 12,
      maxWidth: 95,
      height: 16,
		},
	}),
);

export const EmptyTokenInput: React.FC = () => {
  const buttonStyles = useButtonStyles()

	return (
		<DarkBox>
			<Grid container alignItems="center">
				<Grid item>
					<TokenIcon Icon={TokenSVG} size="large" />
				</Grid>
				<InputsContainer item xs>
					<Grid container justify="space-between" alignItems="center">
						<Grid item xs>
							<Button color="secondary" variant="outlined" classes={buttonStyles}>
								Select a Token
							</Button>
						</Grid>
						<Grid item xs>
							<NumericInput onChange={() => false} />
						</Grid>
					</Grid>
				</InputsContainer>
			</Grid>
		</DarkBox>
	);
};
