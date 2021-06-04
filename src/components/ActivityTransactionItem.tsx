import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { styled, Typography } from '@material-ui/core';
import { TransactionType } from 'context/user';
import mintIcon from 'assets/icons/mint-icon.svg';
import swapIcon from 'assets/icons/swap-icon.svg';
import pendingMintIcon from 'assets/icons/pending-mint.svg';
import pendingSwapIcon from 'assets/icons/pending-swap.svg';

const ActivityListItem = styled('div')({
	height: '81px',
	width: '100%',
	padding: '0 40px 0 35px',
	display: 'flex',
	justifyContent: 'space-between',
	boxSizing: 'border-box',
	borderTop: '1px solid rgb(193,193,255,0.2)!important',
	'& div': {
		fontFamily: 'IBM Plex Sans',
		fontStyle: 'normal',
	},
});
const ActivityDescription = styled('div')({
	height: '80px',
	width: 'fit-content',
	justifyContent: 'flex-start',
	display: 'flex',
	flexDirection: 'row',
});
const ActivityValue = styled(Typography)({
	fontSize: 18,
});
const ActivityIcon = styled('img')({
	height: '32px',
	width: '32px',
});
const ActivityType = styled('div')({
	height: 'fit-content',
	marginBottom: '4px',

	fontWeight: 'normal',
	fontSize: '18px',
	color: '#FAFAF5',
	textTransform: 'capitalize',
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
	type: TransactionType;
	amount: string;
	symbol: string;
	timestamp: string;
	pending: boolean;
}
export const ActivityTransactionItem: React.FC<ActivityTransactionProps> = ({
	type,
	amount,
	symbol,
	timestamp,
	pending,
}) => {
	const iconSrc = useMemo(() => {
		if (type === TransactionType.MINT) {
			if (pending) {
				return pendingMintIcon;
			}

			return mintIcon;
		}

		if (pending) {
			return pendingSwapIcon;
		}

		return swapIcon;
	}, [pending, type]);
	return (
		<ActivityListItem>
			<ActivityDescription>
				<Flex>
					<ActivityIcon src={iconSrc} />
				</Flex>
				<ColumnFlex>
					<ActivityType>{type.toLowerCase()}</ActivityType>
					<ActivityDate>
						{dayjs(timestamp).format('MMM DD')}
						{pending ? ' • Pending' : ''}
					</ActivityDate>
				</ColumnFlex>
			</ActivityDescription>
			<ColumnFlex>
				<ActivityValue color="textPrimary">{`+${amount} ${symbol}`}</ActivityValue>
			</ColumnFlex>
		</ActivityListItem>
	);
};
