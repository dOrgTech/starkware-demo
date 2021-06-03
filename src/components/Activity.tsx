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
					if (Number(transaction.args.token2Amount) > 0) {
						return [
							{
								type: transaction.type,
								timestamp: transaction.timestamp,
								amount: transaction.args.token1Amount,
								symbol: 'TK1',
							},
							{
								type: transaction.type,
								timestamp: transaction.timestamp,
								amount: transaction.args.token2Amount,
								symbol: 'TK2',
							},
						];
					}

					return {
						type: transaction.type,
						timestamp: transaction.timestamp,
						amount: transaction.args.token1Amount,
						symbol: 'TK2',
					};
				}

				return {
					type: transaction.type,
					timestamp: transaction.timestamp,
					amount: transaction.args.to.amount,
					symbol: transaction.args.to.tokenId,
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
