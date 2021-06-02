import React from 'react';
import { Grid, GridProps, styled, Theme, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import hexToRgba from 'hex-to-rgba';
import { useAccountBalance } from '../services/API/queries/useAccountBalance';
import { tokens } from '../constants';

const BalanceBox = styled(Grid)(({ tokenColor }: { theme: Theme; tokenColor: string }) => ({
	height: 42,
	minWidth: 164,
	background: hexToRgba(tokenColor, 0.1),
	borderRadius: 6,
	'& > div': {
		height: '100%',
	},
	margin: '8px',
}));

const BalanceText = styled(Typography)(({ tokenColor }: { theme: Theme; tokenColor: string }) => ({
	fontWeight: 400,
	color: tokenColor,
	fontSize: 18,
	display: 'inline-block',
}));

const BalanceLoader = styled(Skeleton)(({ theme }) => ({
	width: theme.spacing(4),
	fontSize: 18,
}));

const AmountContainer = styled(Grid)({
	marginRight: 6,
});

interface Props extends GridProps {
	symbol: string;
	color: string;
	amount?: string;
}

const TokenBalance = ({ symbol, color, amount, ...props }: Props): JSX.Element => {
	return (
		<BalanceBox item tokenColor={color} {...props}>
			<Grid container justify="center" alignItems="center">
				<AmountContainer item>
					{amount ? <BalanceText tokenColor={color}>{amount}</BalanceText> : <BalanceLoader />}
				</AmountContainer>
				<Grid item>
					<BalanceText tokenColor={color}>{symbol}</BalanceText>
				</Grid>
			</Grid>
		</BalanceBox>
	);
};

export const TokenBalances = (): JSX.Element => {
	const { data: balances } = useAccountBalance();

	console.log('balances =>', balances);

	return (
		<Grid container>
			{tokens.map(({ id, symbol, color }, index) => {
				return (
					<TokenBalance
						key={`balance-${symbol}-${index}`}
						symbol={symbol}
						color={color}
						amount={balances?.get(id)}
						xs={12}
						sm={3}
					/>
				);
			})}
		</Grid>
	);
};
