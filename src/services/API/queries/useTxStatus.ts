import { ActionTypes, UserContext } from 'context/user';
import { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { TransactionStatus } from '../types';
import { httpClient } from '../utils/http';

export const useTxStatus = (id?: number) => {
	const [stop, setStop] = useState(false);
	const { dispatch } = useContext(UserContext);

	const queryProps = useQuery(
		['txStatus', id],
		async () => {
			setStop(false);
			const { data } = await httpClient.get<string>(
				`feeder_gateway/get_transaction_status?transactionId=${id}`,
			);

			return data;
		},
		{
			onSuccess: (data) => {
				if (data === TransactionStatus.REJECTED || data === TransactionStatus.CONFIRMED) {
					dispatch({
						type: ActionTypes.UNSET_ACTIVE_TRANSACTION,
					});
					setStop(true);
				}
			},
			onError: (error) => {
				console.error(`Error while querying for Tx ID ${id}: ${error}`);
				dispatch({
					type: ActionTypes.UNSET_ACTIVE_TRANSACTION,
				});
				setStop(true);
			},
			enabled: !!id,
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
