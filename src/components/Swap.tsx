import React, { useContext, useState } from 'react';
import { Button, Grid, IconButton, styled, Typography } from '@material-ui/core';
import { ReactComponent as SwapDirection } from 'assets/icons/swap-direction.svg';
import { SelectedToken } from './TokenSelector';
import { DarkBox } from './common/DarkBox';
import { NumericInput } from './NumericInput';
import { Token } from 'models/token';
import { RoundedButton } from './common/RoundedButton';
import { ConfirmSwapDialog } from './ConfirmSwapDialog';
import { useConversionError, useConversionRates } from '../hooks/amounts';
import { calculateSwapValue } from '../utils/swap';
import { SwapReceipt } from '../models/swap';
import { useFilteredTokens, useTokenBalance } from '../hooks/tokens';
import { useSwap } from '../services/API/mutations/useSwap';
import { BouncingDots } from './common/BouncingDots';
import { usePoolBalance } from '../services/API/queries/usePoolBalance';
import { UserContext } from '../context/user';
import { Skeleton } from '@material-ui/lab';

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

const ConversionSkeleton = styled(Skeleton)({
	display: 'inline-block',
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
	const {
		state: { activeTransaction },
	} = useContext(UserContext);
	const { mutate: makeSwap, isLoading } = useSwap();
	const options = useFilteredTokens();

	const [showConfirm, setShowConfirm] = useState(false);
	const [fromToken, setFromToken] = useState<Token>(options[0]);
	const [fromAmount, setFromAmount] = useState<string>('');
	const [toToken, setToToken] = useState<Token>(options[1]);
	const [toAmount, setToAmount] = useState<string>('');

	const { data: poolBalance } = usePoolBalance();
	const fromBalance = useTokenBalance(fromToken);
	const toBalance = useTokenBalance(toToken);
	const conversionRates = useConversionRates(fromToken, toToken);

	const fromError = useConversionError(fromToken, fromAmount, fromBalance);
	const toError = useConversionError(toToken, toAmount);

	const poolFromBalance = fromToken ? poolBalance?.get(fromToken.id) : undefined;
	const poolToBalance = toToken ? poolBalance?.get(toToken.id) : undefined;
	const maxAmountError = Number(fromAmount) > 1000 ? 'Max swap limit is 1000' : undefined;
	const error = maxAmountError || fromError || toError;
	const actionButtonText = error || 'Swap';

	const handleSwitch = () => {
		if (!fromToken || !toToken || !poolFromBalance || !poolToBalance) return;

		setFromToken(toToken);
		setToAmount(
			Math.floor(
				calculateSwapValue(poolToBalance, poolFromBalance, toAmount).toNumber(),
			).toString(),
		);
		setFromAmount(toAmount);
		setToToken(fromToken);
	};

	const handleFromAmountChange = (amount: string) => {
		setFromAmount(amount);

		if (!toToken) return;

		if (!amount) {
			setToAmount('');
			return;
		}

		if (!poolFromBalance || !poolToBalance) return;

		setToAmount(
			Math.floor(calculateSwapValue(poolFromBalance, poolToBalance, amount).toNumber()).toString(),
		);
	};

	const handleToAmountChange = (amount: string) => {
		setToAmount(amount);

		if (!amount) {
			setFromAmount('');
			return;
		}

		if (!poolFromBalance || !poolToBalance) return;

		setFromAmount(
			Math.floor(calculateSwapValue(poolFromBalance, poolToBalance, amount).toNumber()).toString(),
		);
	};

	const handleSwap = (receipt: SwapReceipt) => {
		setShowConfirm(false);
		makeSwap(receipt);
	};

	return (
		<>
			<Grid container>
				<Grid item xs={12}>
					<Labels leftText="From" rightText={fromBalance ? `Balance: ${fromBalance}` : ''} />
					<DarkBox>
						<Grid container alignItems="center">
							<Grid item xs aria-label="token to swap">
								<SelectedToken token={fromToken} />
							</Grid>
							<Grid item container xs={4} sm={6} spacing={1} justify="flex-end" alignItems="center">
								<Grid item xs={12} sm={6}>
									<NumericInput
										inputProps={{
											'aria-label': 'amount of token to swap',
										}}
										value={fromAmount}
										handleChange={(change) => handleFromAmountChange(change)}
									/>
								</Grid>
								{fromBalance && (
									<Grid item xs={12} sm={6}>
										<RoundedButton
											onClick={() => {
												if (!fromBalance) return;
												handleFromAmountChange(fromBalance);
											}}
										>
											Max
										</RoundedButton>
									</Grid>
								)}
							</Grid>
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
					<Labels leftText="To" rightText={toBalance ? `Balance: ${toBalance}` : ''} />
					<DarkBox>
						<Grid container alignItems="center">
							<Grid item xs aria-label="token to be swapped">
								<SelectedToken token={toToken} />
							</Grid>
							<Grid item xs={4} sm={6} container alignItems="center">
								<NumericInput
									inputProps={{
										'aria-label': 'amount of token to be swapped',
									}}
									value={toAmount}
									handleChange={(change) => handleToAmountChange(change)}
								/>
							</Grid>
						</Grid>
					</DarkBox>
				</Grid>
				<StyledConversionContainer item xs={12}>
					<StyledEndText variant="subtitle1" color="textSecondary">
						<span>{`1 ${fromToken.symbol} = `}</span>
						<span>
							{conversionRates ? (
								conversionRates.from.toString()
							) : (
								<ConversionSkeleton width={20} />
							)}
						</span>
						<span>{` ${toToken.symbol}`}</span>
					</StyledEndText>
				</StyledConversionContainer>
				<Grid item xs={12}>
					<StyledSwapButton
						variant="contained"
						color="secondary"
						fullWidth
						disableElevation
						disabled={!!error || !!activeTransaction || isLoading}
						onClick={() => setShowConfirm(true)}
					>
						{activeTransaction || isLoading ? <BouncingDots /> : actionButtonText}
					</StyledSwapButton>
				</Grid>
			</Grid>
			<ConfirmSwapDialog
				open={showConfirm && !!fromAmount && !!toAmount}
				from={{ token: fromToken, amount: fromAmount }}
				to={{ token: toToken, amount: toAmount }}
				onClose={() => setShowConfirm(false)}
				onSwap={handleSwap}
			/>
		</>
	);
};
