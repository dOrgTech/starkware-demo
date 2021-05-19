import React, { useState, useContext } from 'react';
import { Button, Grid, IconButton, styled, Typography } from '@material-ui/core';
import { ReactComponent as SwapDirection } from 'assets/icons/swap-direction.svg';
import { TokenSelector } from './TokenSelector';
import { DarkBox } from './common/DarkBox';
import { NumericInput } from './NumericInput';
import { Token, TokenBalance } from 'models/Token';
import { useTokens } from 'services/API/token/hooks/useTokens';
import { useTokenOptions } from 'services/API/token/hooks/useTokenOptions';
import { RoundedButton } from './common/RoundedButton';
import { ActionTypes, NotificationsContext } from 'context/notifications';
import { ConfirmSwapDialog } from './ConfirmSwapDialog';
import { useBalance, useConversionError, useConversionRates } from '../hooks/amounts';
import { getConversionRate } from '../utils/rates';

const StyledInputContainer = styled(Grid)({
	padding: '0 0 0 12px',
});

const StyledArrowsContainer = styled(Grid)({
	width: '100%',
	margin: '0 auto -23px auto',
	height: 65,
});

const StyledSwapButton = styled(Button)({
	marginTop: 20,
});

const StyledLeftLabelText = styled(Typography)({
	fontWeight: 600,
});

const StyledRightLabelText = styled(Typography)({
	fontWeight: 400,
});

const StyledLabelsContainer = styled(Grid)({
	paddingBottom: '5px',
});

const StyledConversionContainer = styled(Grid)({
	marginTop: 16,
});

const StyledEndText = styled(StyledRightLabelText)({
	textAlign: 'end',
});

const Labels = ({ leftText, rightText }: { leftText: string; rightText: string }): JSX.Element => (
	<StyledLabelsContainer container justify="space-between">
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
	</StyledLabelsContainer>
);

export const Swap = (): JSX.Element => {
	const { dispatch } = useContext(NotificationsContext);
	const [showConfirm, setShowConfirm] = useState(false);
	const [fromToken, setFromToken] = useState<Token | undefined>();
	const [fromAmount, setFromAmount] = useState<string>();
	const [toToken, setToToken] = useState<Token>();
	const [toAmount, setToAmount] = useState<string>();

	const { data: tokensData } = useTokens();
	const fromBalance = useBalance(fromToken);
	const toBalance = useBalance(toToken);
	const conversionRates = useConversionRates(fromToken, toToken);
	const options = useTokenOptions(fromToken, tokensData);
	const fromError = useConversionError(fromToken, fromAmount, fromBalance?.amount);
	const toError = useConversionError(toToken, toAmount);
	const maxAmountError = Number(fromAmount) > 1000 ? 'Max swap limit is 1000' : undefined;
	const error = maxAmountError || fromError || toError;

	const handleSwitch = () => {
		if (!fromToken || !toToken) return;

		setFromToken(toToken);
		setToAmount(fromAmount);
		setFromAmount(toAmount);
		setToToken(fromToken);
	};

	const handleFromTokenSelected = (token: Token) => {
		if (toToken && token.symbol === toToken.symbol) {
			setToToken(undefined);
		}

		setFromAmount(undefined);
		setFromToken(token);
	};

	const handleToTokenSelected = (token: Token) => {
		setToToken(token);

		if (fromToken && fromAmount) {
			const conversionRate = getConversionRate(fromToken.price, token.price);
			setToAmount(String(Number(fromAmount) * conversionRate.from));
		}
	};

	const handleFromAmountChange = (amount: string) => {
		setFromAmount(amount);

		if (!toToken) return;

		if (!amount) {
			setToAmount(undefined);
			return;
		}

		setToAmount(String(Number(amount) * conversionRates.from));
	};

	const handleToAmountChange = (amount: string) => {
		setToAmount(amount);

		if (!amount) {
			setFromAmount(undefined);
			return;
		}

		setFromAmount(String(Number(amount) * conversionRates.to));
	};

	return (
		<>
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
												handleChange={(change) => handleFromAmountChange(change)}
											/>
										</Grid>
										{fromBalance && (
											<Grid item xs={6}>
												<RoundedButton
													onClick={() =>
														handleFromAmountChange((fromBalance as TokenBalance).amount)
													}
												>
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
					<Labels leftText="To" rightText={toBalance ? `Balance: ${toBalance.amount}` : ''} />
					<DarkBox>
						<Grid container alignItems="center">
							<Grid item xs aria-label="token to be swapped">
								<TokenSelector value={toToken} options={options} onChange={handleToTokenSelected} />
							</Grid>
							{toToken && (
								<StyledInputContainer item xs>
									<Grid container justify="flex-end" alignItems="center">
										<NumericInput
											inputProps={{
												'aria-label': 'amount of token to be swapped',
											}}
											value={toAmount}
											handleChange={(change) => handleToAmountChange(change)}
										/>
									</Grid>
								</StyledInputContainer>
							)}
						</Grid>
					</DarkBox>
				</Grid>
				{fromToken && toToken && (
					<StyledConversionContainer item xs={12}>
						<StyledEndText
							variant="subtitle1"
							color="textSecondary"
						>{`1 ${fromToken.symbol} = ${conversionRates.from} ${toToken.symbol}`}</StyledEndText>
					</StyledConversionContainer>
				)}
				<Grid item xs={12}>
					<StyledSwapButton
						variant="contained"
						color="secondary"
						fullWidth
						disableElevation
						disabled={!!error}
						onClick={() => setShowConfirm(true)}
					>
						{error ? error : 'Swap'}
					</StyledSwapButton>
				</Grid>
			</Grid>
			<ConfirmSwapDialog
				open={showConfirm && !!fromAmount && !!toAmount}
				conversionRate={conversionRates}
				from={fromToken && fromAmount ? { ...fromToken, amount: fromAmount } : undefined}
				to={toToken && toAmount ? { ...toToken, amount: toAmount } : undefined}
				onClose={() => setShowConfirm(false)}
				onSwap={(receipt) => {
					setShowConfirm(false);
					dispatch({
						type: ActionTypes.OPEN_SUCCESS,
						payload: {
							title: `Success!`,
							icon: receipt.token.icon,
							text: `Received ${receipt.amount} ${receipt.token.symbol}`,
							link: '0xb7d91c4........fa84fc5e6f',
							buttonText: 'Go Back',
						},
					});
				}}
			/>
		</>
	);
};
