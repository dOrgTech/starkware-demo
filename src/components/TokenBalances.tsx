import React from 'react';
import { Grid, GridProps, makeStyles, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import hexToRgba from 'hex-to-rgba';
import { useAccountBalance } from '../services/API/queries/useAccountBalance';
import { tokens } from '../constants';

interface StyleProps {
	tokenColor: string;
}

const useStyles = ({ tokenColor }: StyleProps) => {
	return makeStyles((theme) => ({
		box: {
			height: 42,
			minWidth: 164,
			background: hexToRgba(tokenColor, 0.1),
			borderRadius: 6,
			'& > div': {
				height: '100%',
			},
			margin: '8px',
		},
		text: {
			fontWeight: 400,
			color: tokenColor,
			fontSize: 18,
			display: 'inline-block',
		},
		loader: {
			width: theme.spacing(4),
			fontSize: 18,
		},
		amountContainer: {
			marginRight: 6,
		},
	}));
};

interface Props extends GridProps {
	symbol: string;
	color: string;
	amount?: string;
}

const TokenBalance = ({ symbol, color, amount, className, ...props }: Props): JSX.Element => {
	const classes = useStyles({ tokenColor: color })();

	return (
		<Grid item className={`${className} ${classes.box}`} {...props}>
			<Grid container justify="center" alignItems="center">
				<Grid className={classes.amountContainer} item>
					{amount ? (
						<Typography className={classes.text}>{amount}</Typography>
					) : (
						<Skeleton className={classes.loader} />
					)}
				</Grid>
				<Grid item>
					<Typography className={classes.text}>{symbol}</Typography>
				</Grid>
			</Grid>
		</Grid>
	);
};

export const TokenBalances = (): JSX.Element => {
	const { data: balances } = useAccountBalance();

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
