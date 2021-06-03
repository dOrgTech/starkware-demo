import React, { useContext, useMemo } from 'react';
import { Grid, styled } from '@material-ui/core';
import { UserContext, TransactionType } from 'context/user';
import { ActivityTransactionItem } from 'components/ActivityTransactionItem';

const ActivityListWrapper = styled('div')({
	maxHeight: '431px',
	height: 'fit-content',
	width: '100%',
	overflowY: 'auto',
});

export const Activity = (): JSX.Element => {
	const { state: userState } = useContext(UserContext);
	const activity = userState.activity;

	const formattedActivity = useMemo(() => {
		return activity
			.map((transaction) => {
				if (transaction.type === TransactionType.MINT) {
					if (transaction.args.mint2) {
						return [
							{
								type: transaction.type,
								timestamp: transaction.timestamp,
								amount: transaction.args.mint1.amount,
								symbol: transaction.args.mint1.token.symbol,
							},
							{
								type: transaction.type,
								timestamp: transaction.timestamp,
								amount: transaction.args.mint2.amount,
								symbol: transaction.args.mint2.token.symbol,
							},
						];
					}

					return {
						type: transaction.type,
						timestamp: transaction.timestamp,
						amount: transaction.args.mint1.amount,
						symbol: transaction.args.mint1.token.symbol,
					};
				}

				return {
					type: transaction.type,
					timestamp: transaction.timestamp,
					amount: transaction.args.to.amount,
					symbol: transaction.args.to.token.symbol,
				};
			})
			.flat();
	}, [activity]);

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
