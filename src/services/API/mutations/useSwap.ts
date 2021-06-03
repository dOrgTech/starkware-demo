import { ActionTypes, TransactionType, UserContext } from 'context/user';
import { useContext } from 'react';
import { useMutation } from 'react-query';
import { useTxStatus } from '../queries/useTxStatus';
import { APITransactionType, TransactionResponse } from '../types';
import { sendTransaction } from '../utils/sendTransaction';

const contractAddress = '0x0000000000000000000000000000000000000000000000000000000000000005';

interface SwapInformation {
	tokenId: string;
	amount: string;
}

export interface SwapArgs {
	from: SwapInformation;
	to: SwapInformation;
}

export const useSwap = () => {
	const { dispatch } = useContext(UserContext);

	const {
		mutate,
		data: swapData,
		error: swapError,
		isLoading: swapIsLoading,
	} = useMutation<TransactionResponse, Error, SwapArgs>(async ({ from, to }) => {
		const result = await sendTransaction({
			contract_address: contractAddress,
			entry_point_selector: '0x15543c3708653cda9d418b4ccd3be11368e40636c10c44b18cfe756b6d88b29',
			type: APITransactionType.INVOKE_FUNCTION,
			calldata: ['idx', from.tokenId, from.amount, to.amount],
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

	const { isStopped, data, error } = useTxStatus(swapData?.tx_id);

	return {
		mutate,
		txStatus: data,
		isStopped,
		data: swapData,
		error: swapError || error,
		swapLoading: swapIsLoading,
	};
};
