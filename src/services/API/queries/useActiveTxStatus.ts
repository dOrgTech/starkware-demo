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
import { useQuery, useQueryClient } from 'react-query';
import { TransactionStatus } from '../types';
import { httpClient } from '../utils/http';
import { useTxNotifications } from '../../../hooks/notifications';

export const useActiveTxStatus = () => {
	const {
		state: { activeTransaction },
		dispatch: userDispatch,
	} = useContext(UserContext);
	const { dispatch: notificationDispatch } = useContext(NotificationsContext);
	const [stop, setStop] = useState(false);

	const queryClient = useQueryClient();
	const { showSuccess, showError, closeSnackbar } = useTxNotifications();

	const displayNotifications = () => {
		if (!activeTransaction) return;

		if (activeTransaction.type === TransactionType.MINT) {
			const { mint1, mint2 } = activeTransaction.args;

			if (!mint2) {
				notificationDispatch({
					type: NotificationsActionTypes.OPEN_SUCCESS,
					payload: {
						title: `Success!`,
						icon: mint1.token.icon,
						text: `Received ${mint1.amount} ${mint1.token.symbol}`,
						txId: activeTransaction.id,
						buttonText: 'Go Back',
					},
				});
				return;
			}

			notificationDispatch({
				type: NotificationsActionTypes.OPEN_MULTI_TOKEN_SUCCESS,
				payload: {
					title: `Success!`,
					icons: [mint1.token.icon, mint2.token.icon],
					text: `Minted ${mint1.amount} ${mint1.token.symbol} & ${mint2.amount} ${mint2.token.symbol}`,
					txIds: [activeTransaction.id],
					buttonText: 'Go Back',
				},
			});
		}

		if (activeTransaction.type === TransactionType.SWAP) {
			const { to } = activeTransaction.args;
			notificationDispatch({
				type: NotificationsActionTypes.OPEN_SUCCESS,
				payload: {
					title: `Success!`,
					icon: to.token.icon,
					text: `Received ${to.amount} ${to.token.symbol}`,
					txId: activeTransaction.id,
					buttonText: 'Go Back',
				},
			});
		}
	};

	const handleTxSuccess = (data: unknown) => {
		//TODO: remove execution on rejected
		if (data === TransactionStatus.REJECTED || data === TransactionStatus.ACCEPTED_ONCHAIN) {
			queryClient.resetQueries('accountBalance');
			setStop(true);
			closeSnackbar();
			showSuccess();
			userDispatch({
				type: UserActionTypes.ADD_TRANSACTION,
				payload: activeTransaction as Transaction,
			});
			userDispatch({
				type: UserActionTypes.UNSET_ACTIVE_TRANSACTION,
			});
			displayNotifications();
		}
	};

	const handleTxError = (error: unknown) => {
		console.error(`Error while querying for Tx ID ${activeTransaction?.id}: ${error}`);
		setStop(true);
		closeSnackbar();
		showError();
		userDispatch({
			type: UserActionTypes.UNSET_ACTIVE_TRANSACTION,
		});
	};

	const queryProps = useQuery(
		['txStatus', activeTransaction],
		async () => {
			setStop(false);
			const { data } = await httpClient.get<string>(
				`feeder_gateway/get_transaction_status?transactionId=${activeTransaction?.id}`,
			);

			return data;
		},
		{
			onSuccess: handleTxSuccess,
			onError: handleTxError,
			enabled: !!activeTransaction,
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
