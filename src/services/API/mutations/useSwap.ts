import { ActionTypes, TransactionType, UserContext } from 'context/user';
import { useContext } from 'react';
import dayjs from 'dayjs';
import { useMutation } from 'react-query';
import { APITransactionType, TransactionResponse } from '../types';
import { sendTransaction } from '../utils/sendTransaction';
import { SwapInformation } from '../../../models/swap';
import { CONTRACT_ADDRESS, SWAP_ENTRYPOINT } from '../../../constants';
import { useTxNotifications } from '../../../hooks/notifications';

export interface SwapArgs {
	from: SwapInformation;
	to: SwapInformation;
}

export const useSwap = () => {
	const {
		dispatch,
		state: { userId },
	} = useContext(UserContext);
	const { showPendingTransaction } = useTxNotifications();

	return useMutation<TransactionResponse, Error, SwapArgs>(async ({ from, to }) => {
		const result = await sendTransaction({
			contract_address: CONTRACT_ADDRESS,
			entry_point_selector: SWAP_ENTRYPOINT,
			type: APITransactionType.INVOKE_FUNCTION,
			calldata: [userId, from.token.id, from.amount],
		});

		showPendingTransaction();
		dispatch({
			type: ActionTypes.SET_ACTIVE_TRANSACTION,
			payload: {
				id: result.transaction_hash.toString(),
				type: TransactionType.SWAP,
				args: {
					from,
					to,
				},
				timestamp: dayjs().toString(),
			},
		});

		return result;
	});
};
