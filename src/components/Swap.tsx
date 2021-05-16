import React, { useState, useCallback, useMemo } from 'react';
import { Button, Grid, IconButton, styled, Typography } from '@material-ui/core';

import { ReactComponent as SwapDirection } from 'assets/icons/swap-direction.svg';
import { TokenSelector } from './TokenSelector';
import { DarkBox } from './common/DarkBox';
import { NumericInput } from './NumericInput';
import { Token } from 'services/API/token/types';
import { useTokens } from 'services/API/token/hooks/useTokens';
import { useTokenOptions } from 'services/API/token/hooks/useTokenOptions';
import { useTokenBalances } from 'services/API/token/hooks/useTokenBalances';
import { RoundedButton } from './common/RoundedButton';

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

const StyledLeftLabelText = styled(Typography)({
	fontWeight: 600,
});

const StyledRightLabelText = styled(Typography)({
	fontWeight: 400,
});

const LabelsContainer = styled(Grid)({
	paddingBottom: '5px',
});

const Labels = ({ leftText, rightText }: { leftText: string; rightText: string }): JSX.Element => (
	<LabelsContainer container justify="space-between">
		<Grid item>
			<StyledLeftLabelText variant="subtitle1" color="textPrimary">
				{leftText}
			</StyledLeftLabelText>
		</Grid>
		<Grid item>
			<StyledRightLabelText variant="subtitle1" color="textSecondary">
				{rightText}
			</StyledRightLabelText>
		</Grid>
	</LabelsContainer>
);

export const Swap = (): JSX.Element => {
	const [fromValue, setFromValue] = useState('');
	const [toValue, setToValue] = useState('');
	const { data: tokensData } = useTokens();

	const [fromToken, setFromToken] = useState<Token | undefined>();
	const [fromAmount, setFromAmount] = useState<string>();
	const [toToken, setToToken] = useState<Token>();
	const [toAmount, setToAmount] = useState<string>();
	const { data: tokenBalances } = useTokenBalances();

	const fromBalance = useMemo(() => {
		if (!fromToken || !tokenBalances) {
			return undefined;
		}

		return tokenBalances.find((tokenBalance) => tokenBalance.token.symbol === fromToken.symbol);
	}, [tokenBalances, fromToken]);

	const toBalance = useMemo(() => {
		if (!toToken || !tokenBalances) {
			return undefined;
		}

		return tokenBalances.find((tokenBalance) => tokenBalance.token.symbol === toToken.symbol);
	}, [tokenBalances, toToken]);

	const handleSwitch = useCallback(() => {
		setFromValue(toValue);
		setToValue(fromValue);

		setFromToken(toToken);
		setToToken(fromToken);
	}, [fromToken, fromValue, toToken, toValue]);

	const handleFromTokenSelected = (token: Token) => {
		if (toToken && token.symbol === toToken.symbol) {
			setToToken(undefined);
		}

		setFromAmount('0');
		setFromToken(token);
	};

	const options = useTokenOptions(fromToken, tokensData);

	return (
		<Grid container>
			<Grid item xs={12}>
				<Labels leftText="From" rightText={fromBalance ? `Balance: ${fromBalance.amount}` : ''} />
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
									<Grid item xs={6}>
										<NumericInput
											inputProps={{
												'aria-label': 'amount of token to swap',
											}}
											value={fromAmount}
											handleChange={(change) => setFromAmount(change)}
										/>
									</Grid>
									{fromBalance && (
										<Grid item xs={6}>
											<RoundedButton onClick={() => setFromAmount(fromBalance.amount)}>
												Max
											</RoundedButton>
										</Grid>
									)}
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
				<Labels leftText="From" rightText={toBalance ? `Balance: ${toBalance.amount}` : ''} />
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
										handleChange={(change) => setToAmount(change)}
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
