import { useContext, useState } from 'react';
import {
	ActionTypes as UserActionTypes,
	Transaction,
	TransactionType,
	UserContext,
} from 'context/user';
import {
	ActionTypes as NotificationsActionTypes,
	NotificationsContext,
} from 'context/notifications';
import { useQuery } from 'react-query';
import { TransactionStatus } from '../types';
import { httpClient } from '../utils/http';

// TODO: evaluate if we can make the tx not optional
export const useTxStatus = (tx?: Transaction) => {
	const [stop, setStop] = useState(false);
	const { dispatch: userDispatch } = useContext(UserContext);
	const { dispatch: notificationDispatch } = useContext(NotificationsContext);

	const queryProps = useQuery(
		['txStatus', tx],
		async () => {
			setStop(false);
			const { data } = await httpClient.get<string>(
				`feeder_gateway/get_transaction_status?transactionId=${tx?.id}`,
			);

			return data;
		},
		{
			// TODO: make this more readable
			onSuccess: (data) => {
				if (data === TransactionStatus.REJECTED || data === TransactionStatus.CONFIRMED) {
					setStop(true);
					userDispatch({
						type: UserActionTypes.UNSET_ACTIVE_TRANSACTION,
					});

					if (!tx) return;

					if (tx.type === TransactionType.MINT) {
						const { mint1 } = tx.args;
						notificationDispatch({
							type: NotificationsActionTypes.OPEN_SUCCESS,
							payload: {
								title: `Success!`,
								icon: mint1.token.icon,
								text: `Received ${mint1.amount} ${mint1.token.symbol}`,
								link: '0xb7d91c4........fa84fc5e6f',
								buttonText: 'Go Back',
							},
						});
					}

					if (tx.type === TransactionType.SWAP) {
						const { to } = tx.args;
						notificationDispatch({
							type: NotificationsActionTypes.OPEN_SUCCESS,
							payload: {
								title: `Success!`,
								icon: to.token.icon,
								text: `Received ${to.amount} ${to.token.symbol}`,
								link: '0xb7d91c4........fa84fc5e6f',
								buttonText: 'Go Back',
							},
						});
					}
				}
			},
			onError: (error) => {
				console.error(`Error while querying for Tx ID ${tx?.id}: ${error}`);
				userDispatch({
					type: UserActionTypes.UNSET_ACTIVE_TRANSACTION,
				});
				setStop(true);
			},
			// TODO: related to :16
			enabled: !!tx,
			refetchInterval: stop ? false : 10000,
			refetchIntervalInBackground: true,
			refetchOnWindowFocus: false,
		},
	);

	return {
		...queryProps,
		isStopped: stop,
	};
};
