import { Grid, GridProps, styled, Theme, Typography } from '@material-ui/core';
import hexToRgba from 'hex-to-rgba';
import React, { useMemo } from 'react';
import { useTokenBalances } from 'services/API/token/hooks/useTokenBalances';

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

interface Props extends GridProps {
	symbol: string;
	color: string;
	amount: string;
}

const TokenBalance: React.FC<Props> = ({ symbol, color, amount, ...props }) => {
	return (
		<BalanceBox item tokenColor={color} {...props}>
			<Grid container justify="center" alignItems="center">
				<Grid item>
					<BalanceText tokenColor={color}>
						{amount} {symbol}
					</BalanceText>
				</Grid>
			</Grid>
		</BalanceBox>
	);
};

export const TokenBalances: React.FC = () => {
	const { data } = useTokenBalances();

	const balances = useMemo(() => {
		if (!data) {
			return [];
		}

		return data;
	}, [data]);

	return (
		<Grid container>
			{balances.map((balance, i) => {
				return (
					<TokenBalance
						key={`balance-${i}`}
						symbol={balance.token.symbol}
						color={balance.token.color}
						amount={balance.amount}
						xs={12}
						sm={3}
					/>
				);
			})}
		</Grid>
	);
};
