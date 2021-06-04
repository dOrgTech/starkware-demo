import React, { useContext, useMemo } from 'react';
import { Grid, styled } from '@material-ui/core';
import { UserContext, TransactionType } from 'context/user';
import { ActivityTransactionItem } from 'components/ActivityTransactionItem';
import hexToRgba from 'hex-to-rgba';

const ActivityListWrapper = styled('div')(({ theme }) => ({
	maxHeight: '431px',
	height: 'fit-content',
	margin: '0 -33px -30px -33px',
	overflowY: 'auto',

	'&::-webkit-scrollbar': {
		width: 4,
	},
	'&::-webkit-scrollbar-track': {
		'-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.3)',
		borderRadius: 10,
	},
	'&::-webkit-scrollbar-thumb': {
		backgroundColor: hexToRgba(theme.palette.secondary.main, 0.2),
		borderRadius: 10,
	},
}));

export const Activity = (): JSX.Element => {
	const { state: userState } = useContext(UserContext);

	const formattedActivity = useMemo(() => {
		const activity = userState.activeTransaction
			? [userState.activeTransaction, ...userState.activity]
			: userState.activity;

		return activity
			.map((transaction) => {
				const pending = userState.activeTransaction?.id === transaction.id;

				if (transaction.type === TransactionType.MINT) {
					if (transaction.args.mint2) {
						return [
							{
								type: transaction.type,
								timestamp: transaction.timestamp,
								amount: transaction.args.mint1.amount,
								symbol: transaction.args.mint1.token.symbol,
								pending,
							},
							{
								type: transaction.type,
								timestamp: transaction.timestamp,
								amount: transaction.args.mint2.amount,
								symbol: transaction.args.mint2.token.symbol,
								pending,
							},
						];
					}

					return {
						type: transaction.type,
						timestamp: transaction.timestamp,
						amount: transaction.args.mint1.amount,
						symbol: transaction.args.mint1.token.symbol,
						pending,
					};
				}

				return {
					type: transaction.type,
					timestamp: transaction.timestamp,
					amount: transaction.args.to.amount,
					symbol: transaction.args.to.token.symbol,
					pending,
				};
			})
			.flat();
	}, [userState.activeTransaction, userState.activity]);

	return (
		<Grid container>
			<Grid item xs={12}>
				<ActivityListWrapper>
					{formattedActivity.map((transaction, i) => (
						<ActivityTransactionItem key={`transaction-${i}`} {...transaction} />
					))}
				</ActivityListWrapper>
			</Grid>
		</Grid>
	);
};
