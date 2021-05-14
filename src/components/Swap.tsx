import { Box, Button, Grid, styled, Typography } from '@material-ui/core';
import React from 'react';
import { ReactComponent as TokenSVG } from 'assets/tokens/token.svg';
import { ReactComponent as Token2SVG } from 'assets/tokens/token2.svg';
import { ReactComponent as ArrowUpSVG } from 'assets/icons/arrow-up.svg';
import { ReactComponent as ArrowDownSVG } from 'assets/icons/arrow-down.svg';
import { Token } from 'models/token';
import { useState } from 'react';
import { useCallback } from 'react';
import { TokenInput } from './TokenInput';
import { TokenSelector } from './TokenSelector';

const ArrowsContainer = styled(Grid)({
	width: '100%',
	margin: '0 auto -23px auto',
	height: 65,
});

const ArrowsButton = styled(Button)({
	padding: 0,
	minWidth: 'unset',
});

const SwapButton = styled(Button)(({ theme }) => ({
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

const LabelText = styled(Typography)({
	fontWeight: 600,
});

const Label: React.FC<{ text: string }> = ({ text }) => (
	<Box paddingBottom="5px">
		<LabelText variant="subtitle1" color="textPrimary">
			{text}
		</LabelText>
	</Box>
);

export const TOKENS: Token[] = [
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
	const [toToken, setToToken] = useState<Token | undefined>();

	const handleSwitch = useCallback(() => {
		setFromValue(toValue);
		setToValue(fromValue);

		setFromToken(toToken);
		setToToken(fromToken);
	}, [fromToken, fromValue, toToken, toValue]);

	// const handleFromChange = useCallback((amount) => {
	// 	setFromValue(amount)
	// 	setToValue((Number(amount) * Number(fromToken.price)).toString())
	// }, [fromToken.price])

	// const handleToChange = useCallback((amount) => {
	// 	setToValue(amount)
	// 	setFromValue((Number(amount) / Number(toToken.price)).toString())
	// }, [toToken.price])

	return (
		<Box>
			<Label text="From" />
			{fromToken ? (
				<TokenInput
					inputProps={{
						value: fromValue,
						onChange: (amount) => setFromValue(amount),
					}}
					tokenProps={{ symbol: fromToken.symbol, icon: fromToken.icon }}
					tokens={TOKENS}
					handleSelect={(token) => {
						setFromToken(token);
					}}
				/>
			) : (
				<TokenSelector
					handleSelect={(token) => {
						setFromToken(token);
					}}
					tokens={TOKENS}
				/>
			)}

			<ArrowsContainer container justify="center" alignItems="center">
				<Grid item>
					<ArrowsButton variant="text" onClick={handleSwitch}>
						<Grid container>
							<Grid item>
								<ArrowDownSVG />
							</Grid>
							<Grid item>
								<ArrowUpSVG />
							</Grid>
						</Grid>
					</ArrowsButton>
				</Grid>
			</ArrowsContainer>

			<Label text="To" />
			{toToken ? (
				<TokenInput
					inputProps={{
						value: toValue,
						onChange: (amount) => setToValue(amount),
					}}
					tokenProps={{ symbol: toToken.symbol, icon: toToken.icon }}
					tokens={TOKENS}
					handleSelect={(token) => {
						setToToken(token);
					}}
				/>
			) : (
				<TokenSelector
					handleSelect={(e) => {
						setToToken(e);
					}}
					tokens={TOKENS}
				/>
			)}
			<SwapButton fullWidth variant="contained">
				Swap
			</SwapButton>
		</Box>
	);
};
