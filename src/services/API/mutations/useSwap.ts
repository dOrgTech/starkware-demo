import { ActionTypes, TransactionType, UserContext } from 'context/user';
import { useContext } from 'react';
import { useMutation } from 'react-query';
import { useActiveTxStatus } from '../queries/useActiveTxStatus';
import { APITransactionType, TransactionResponse } from '../types';
import { sendTransaction } from '../utils/sendTransaction';
import { SwapInformation } from '../../../models/swap';
import { CONTRACT_ADDRESS } from '../../../constants';

export interface SwapArgs {
	from: SwapInformation;
	to: SwapInformation;
}

export const useSwap = () => {
	const {
		dispatch,
		state: { userId },
	} = useContext(UserContext);

	const {
		mutate,
		data: swapData,
		error: swapError,
		isLoading: swapIsLoading,
	} = useMutation<TransactionResponse, Error, SwapArgs>(async ({ from, to }) => {
		const result = await sendTransaction({
			contract_address: CONTRACT_ADDRESS,
			entry_point_selector: '0x15543c3708653cda9d418b4ccd3be11368e40636c10c44b18cfe756b6d88b29',
			type: APITransactionType.INVOKE_FUNCTION,
			calldata: [userId, from.token.id, from.amount, to.amount],
		});

		dispatch({
			type: ActionTypes.SET_ACTIVE_TRANSACTION,
			payload: {
				id: result.tx_id.toString(),
				type: TransactionType.SWAP,
				args: {
					from,
					to,
				},
			},
		});

		return result;
	});

	const { isStopped, data, error } = useActiveTxStatus();

	return {
		mutate,
		txStatus: data,
		isStopped,
		data: swapData,
		error: swapError || error,
		swapLoading: swapIsLoading,
	};
};
