import { Grid, styled, Typography } from '@material-ui/core';
import React from 'react';
import { DarkBox } from './common/DarkBox';
import { TokenIcon } from './common/TokenIcon';
import { NumericInput, NumericInputProps } from './NumericInput';

const InputsContainer = styled(Grid)({
	padding: '0 0 0 12px',
});

export interface TokenInputProps {
	tokenProps: {
		symbol: string;
		icon: string;
	};
	inputProps: NumericInputProps;
}

export const TokenInput: React.FC<TokenInputProps> = ({ tokenProps, inputProps }) => {
	return (
		<DarkBox>
			<Grid container alignItems="center">
				<Grid item>
					<TokenIcon icon={tokenProps.icon} size="medium" />
				</Grid>
				<InputsContainer item xs>
					<Grid container justify="space-between" alignItems="center">
						<Grid item xs>
							<Typography variant="body1" color="textPrimary">
								{tokenProps.symbol}
							</Typography>
						</Grid>
						<Grid item xs>
							<NumericInput {...inputProps} />
						</Grid>
					</Grid>
				</InputsContainer>
			</Grid>
		</DarkBox>
	);
};
