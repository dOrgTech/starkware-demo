import React, { useState, useCallback } from 'react';
import { Box, Button, Grid, IconButton, styled, Typography } from '@material-ui/core';

import { Token } from 'models/token';
import { ReactComponent as TokenSVG } from 'assets/tokens/token.svg';
import { ReactComponent as Token2SVG } from 'assets/tokens/token2.svg';
import { ReactComponent as SwapDirection } from 'assets/icons/swap-direction.svg';
import { TokenSelector } from './TokenSelector';
import { DarkBox } from './common/DarkBox';
import { NumericInput } from './NumericInput';

const StyledInputContainer = styled(Grid)({
	padding: '0 0 0 12px',
});

const StyledArrowsContainer = styled(Grid)({
	width: '100%',
	margin: '0 auto -23px auto',
	height: 65,
});

const StyledSwapButton = styled(Button)(({ theme }) => ({
	marginTop: 32,
	height: 66,
	background: 'rgba(145, 145, 183, 0.15);',
	color: theme.palette.text.primary,
	borderColor: 'rgba(145, 145, 183, 0.15);',
	borderRadius: 6,
	boxShadow: 'unset',
	'&:hover': {
		backgroundColor: 'rgba(145, 145, 183, 0.1);',
		boxShadow: 'unset',
	},
}));

const StyledLabelText = styled(Typography)({
	fontWeight: 600,
});

const Label = ({ text }: { text: string }): JSX.Element => (
	<Box paddingBottom="5px">
		<StyledLabelText variant="subtitle1" color="textPrimary">
			{text}
		</StyledLabelText>
	</Box>
);

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

export const Swap = (): JSX.Element => {
	const [fromValue, setFromValue] = useState('');
	const [toValue, setToValue] = useState('');

	const [fromToken, setFromToken] = useState<Token | undefined>(TOKENS[0]);
	const [fromAmount, setFromAmount] = useState<string>();
	const [toToken, setToToken] = useState<Token>();
	const [toAmount, setToAmount] = useState<string>();

	const handleSwitch = useCallback(() => {
		if (!fromToken || !toToken) return;

		setFromValue(toValue);
		setToValue(fromValue);

		setFromToken(toToken);
		setToToken(fromToken);
	}, [fromToken, fromValue, toToken, toValue]);

	const handleFromTokenSelected = (token: Token) => {
		if (toToken && token.symbol === toToken.symbol) {
			setToToken(undefined);
		}

		setFromToken(token);
	};

	const options = fromToken ? TOKENS.filter((token) => token.symbol !== fromToken.symbol) : TOKENS;

	return (
		<Grid container>
			<Grid item xs={12}>
				<Label text="From" />
				<DarkBox>
					<Grid container alignItems="center">
						<Grid item xs aria-label="token to swap">
							<TokenSelector
								value={fromToken}
								options={options}
								onChange={handleFromTokenSelected}
							/>
						</Grid>
						{fromToken && (
							<StyledInputContainer item xs>
								<Grid container justify="flex-end" alignItems="center">
									<NumericInput
										inputProps={{
											'aria-label': 'amount of token to swap',
										}}
										value={fromAmount}
										onChange={(change) => setFromAmount(change)}
									/>
								</Grid>
							</StyledInputContainer>
						)}
					</Grid>
				</DarkBox>
			</Grid>
			<Grid item xs={12}>
				<StyledArrowsContainer container justify="center" alignItems="center">
					<Grid item>
						<IconButton aria-label="invert tokens swap direction" onClick={handleSwitch}>
							<SwapDirection />
						</IconButton>
					</Grid>
				</StyledArrowsContainer>
			</Grid>
			<Grid item xs={12}>
				<Label text="To" />
				<DarkBox>
					<Grid container alignItems="center">
						<Grid item xs aria-label="token to be swapped">
							<TokenSelector
								value={toToken}
								options={options}
								onChange={(token) => setToToken(token)}
							/>
						</Grid>
						{toToken && (
							<StyledInputContainer item xs>
								<Grid container justify="flex-end" alignItems="center">
									<NumericInput
										inputProps={{
											'aria-label': 'amount of token to be swapped',
										}}
										value={toAmount}
										onChange={(change) => setToAmount(change)}
									/>
								</Grid>
							</StyledInputContainer>
						)}
					</Grid>
				</DarkBox>
			</Grid>
			<Grid item xs={12}>
				<StyledSwapButton fullWidth variant="contained">
					Swap
				</StyledSwapButton>
			</Grid>
		</Grid>
	);
};
