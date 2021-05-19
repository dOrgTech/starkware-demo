import React from 'react';
import { Grid, styled, Typography } from '@material-ui/core';
import { Transaction, TransactionType } from 'context/user';
import mintIcon from 'assets/icons/mint-icon.svg';
import swapIcon from 'assets/icons/swap-icon.svg';

const ActivityListItem = styled('div')(({ theme }) => ({
	height: '81px',
	width: '100%',
	display: 'flex',
	justifyContent: 'space-between',
	boxSizing: 'border-box',
	borderTop: '1px solid rgb(193,193,255,0.2)!important',
	'& div': {
		fontFamily: 'IBM Plex Sans',
		fontStyle: 'normal',
	},
}));
const ActivityDescription = styled('div')(({ theme }) => ({
	height: '80px',
	width: 'fit-content',
	justifyContent: 'flex-start',
	display: 'flex',
	flexDirection: 'row',
}));
const ActivityValue = styled('div')(({ theme }) => ({
	width: 'fit-content',
}));
const ActivityIcon = styled('img')({
	height: '32px',
	width: '32px',
});
const ActivityType = styled('div')({
	height: 'fit-content',
	marginBottom: '13px',

	fontWeight: 'normal',
	fontSize: '18px',
	color: '#FAFAF5',
});
const ActivityDate = styled('div')({
	fontSize: '14px',
	color: '#FAFAF5',
	opacity: 0.6,
});
const Flex = styled('div')({
	display: 'flex',
	justifyContent: 'start',
	alignItems: 'center',
	marginRight: '16px',
});
const ColumnFlex = styled('div')({
	display: 'flex',
	justifyContent: 'center',
	flexDirection: 'column',
	height: '80px',
});

interface ActivityTransactionProps {
	transaction: Transaction;
}
export const ActivityTransactionItem: React.FC<ActivityTransactionProps> = ({
	transaction,
	...props
}) => {
	return (
		<ActivityListItem>
			<ActivityDescription>
				<Flex>
					<ActivityIcon src={transaction.type === TransactionType.MINT ? mintIcon : swapIcon} />
				</Flex>
				<ColumnFlex>
					<ActivityType>{transaction.displayName}</ActivityType>
					<ActivityDate>{transaction.executedOn}</ActivityDate>
				</ColumnFlex>
			</ActivityDescription>
			<ColumnFlex>
				<ActivityValue>{`+${transaction.value} ${transaction.incomingToken.name}`}</ActivityValue>
			</ColumnFlex>
		</ActivityListItem>
	);
};
