import React, { useContext, useMemo } from 'react';
import { Grid, styled, Typography } from '@material-ui/core';
import { UserContext, TransactionType } from 'context/user';
import { ActivityTransactionItem } from 'components/ActivityTransactionItem';
import { ReactComponent as DisabledLogo } from 'assets/disabled-logo.svg';

const ActivityListWrapper = styled('div')(() => ({
	maxHeight: '431px',
	height: 'fit-content',
	margin: '0 -33px -30px -33px',
	overflowY: 'auto',
}));

const PlaceholderActivityContent = styled(Grid)({
	height: 294,
	textAlign: 'center',
	marginTop: -22,
});

const NoTransactionsText = styled(Typography)({
	fontWeight: 500,
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
								id: transaction.id,
								pending,
							},
							{
								type: transaction.type,
								timestamp: transaction.timestamp,
								amount: transaction.args.mint2.amount,
								symbol: transaction.args.mint2.token.symbol,
								id: transaction.id,
								pending,
							},
						];
					}

					return {
						type: transaction.type,
						timestamp: transaction.timestamp,
						amount: transaction.args.mint1.amount,
						symbol: transaction.args.mint1.token.symbol,
						id: transaction.id,
						pending,
					};
				}

				return {
					type: transaction.type,
					timestamp: transaction.timestamp,
					amount: transaction.args.to.amount,
					symbol: transaction.args.to.token.symbol,
					id: transaction.id,
					pending,
				};
			})
			.flat()
			.sort((a, b) => Number(b.id) - Number(a.id));
	}, [userState.activeTransaction, userState.activity]);

	const ActivityList = () => {
		if (formattedActivity.length === 0) {
			return (
				<>
					<PlaceholderActivityContent
						container
						direction="column"
						spacing={2}
						alignItems="center"
						justify="center"
					>
						<Grid item>
							<DisabledLogo />
						</Grid>
						<Grid item>
							<NoTransactionsText variant="body2" color="textSecondary">
								No transactions
							</NoTransactionsText>
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
