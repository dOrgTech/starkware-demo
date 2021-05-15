import React, { useState } from 'react';
import { DarkBox } from './common/DarkBox';
import { TokenSelector } from './TokenSelector';
import { Token } from '../models/token';
import { ReactComponent as TokenSVG } from '../assets/tokens/token.svg';
import { ReactComponent as Token2SVG } from '../assets/tokens/token2.svg';
import { Grid, styled } from '@material-ui/core';
import { NumericInput } from './NumericInput';

const StyledInputContainer = styled(Grid)({
	padding: '0 0 0 12px',
});

const TOKENS: Token[] = [
	{
		id: '1',
		name: 'Token 1',
		symbol: 'TK1',
		icon: TokenSVG,
		price: '2',
	},
	{
		id: '2',
		name: 'Token 2',
		symbol: 'TK2',
		icon: Token2SVG,
		price: '1',
	},
];

export const Mint = (): JSX.Element => {
	const [token, setToken] = useState<Token>();
	const [mintAmount, setMintAmount] = useState<string>();

	const options = token ? TOKENS.filter((option) => token.symbol !== option.symbol) : TOKENS;

	return (
		<DarkBox>
			<Grid container alignItems="center">
				<Grid item xs>
					<TokenSelector value={token} options={options} onChange={(token) => setToken(token)} />
				</Grid>
				{token && (
					<StyledInputContainer item xs>
						<Grid container justify="flex-end" alignItems="center">
							<NumericInput
								inputProps={{
									'aria-label': 'mint amount',
								}}
								value={mintAmount}
								onChange={(change) => setMintAmount(change)}
							/>
						</Grid>
					</StyledInputContainer>
				)}
			</Grid>
		</DarkBox>
	);
};
