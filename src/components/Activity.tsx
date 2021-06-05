import React, { useContext, useMemo } from 'react';
import { Divider, Grid, styled, Typography } from '@material-ui/core';
import { UserContext, TransactionType } from 'context/user';
import { ActivityTransactionItem } from 'components/ActivityTransactionItem';

const ActivityListWrapper = styled('div')(() => ({
	maxHeight: '431px',
	height: 'fit-content',
	margin: '0 -33px -30px -33px',
	overflowY: 'auto',
}));

const PlaceholderActivityContent = styled(Grid)({
	height: 403,
	textAlign: 'center',
});

const PlaceholderDivider = styled(Divider)({
	backgroundColor: 'rgb(193,193,255,0.2)',
	margin: '0 -33px -30px -33px',
});

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

	const ActivityList = () => {
		if (formattedActivity.length === 0) {
			return (
				<>
					<PlaceholderDivider />
					<PlaceholderActivityContent container alignItems="center">
						<Grid item xs={12}>
							<Typography variant="body1" color="textSecondary">
								No transactions
							</Typography>
						</Grid>
					</PlaceholderActivityContent>
				</>
			);
		}

		return (
			<ActivityListWrapper>
				{formattedActivity.map((transaction, i) => (
					<ActivityTransactionItem key={`transaction-${i}`} {...transaction} />
				))}
			</ActivityListWrapper>
		);
	};

	return (
		<Grid container>
			<Grid item xs={12}>
				<ActivityList />
			</Grid>
		</Grid>
	);
};
