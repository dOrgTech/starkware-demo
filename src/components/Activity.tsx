import React, { useContext } from 'react';
import { Grid, styled } from '@material-ui/core';
import { UserContext, Transaction } from 'context/user';
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

	return (
		<Grid container>
			<Grid item xs={12}>
				<ActivityListWrapper>
					{activity.map((transaction: Transaction) => (
						<ActivityTransactionItem key={transaction.id} transaction={transaction} />
					))}
				</ActivityListWrapper>
			</Grid>
		</Grid>
	);
};
