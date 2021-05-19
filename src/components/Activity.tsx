import React, { useState, useCallback, useMemo, useContext } from 'react';
import { Grid, styled, Typography } from '@material-ui/core';
import { BigNumber } from '@ethersproject/bignumber';
import { ActionTypes, UserContext, Transaction } from 'context/user';
import { ActivityTransactionItem } from 'components/ActivityTransactionItem';

const ActivityListWrapper = styled('div')(({ theme }) => ({
	maxHeight: '431px',
	height: 'fit-content',
	width: '100%',
	overflowY: 'auto',
}));

export const Activity = (): JSX.Element => {
	const { state: userState, dispatch } = useContext(UserContext);
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
