import { CONTRACT_ADDRESS } from '../../../constants';
import { useMutation } from 'react-query';
import dayjs from 'dayjs';
import { APITransactionType, TransactionResponse } from '../types';
import { sendTransaction } from '../utils/sendTransaction';
import { useContext } from 'react';
import { ActionTypes, TransactionType, UserContext } from 'context/user';
import { useTxStatus } from '../queries/useTxStatus';

export interface MintArgs {
	token1Amount: string;
	token2Amount: string;
	accountId: string;
}

export const useMint = () => {
	const { dispatch } = useContext(UserContext);

	const {
		mutate,
		data: mintData,
		error: mintError,
		isLoading: mintIsLoading,
	} = useMutation<TransactionResponse, Error, MintArgs>(
		async ({ accountId, token1Amount, token2Amount }) => {
			const result = await sendTransaction({
				contract_address: CONTRACT_ADDRESS,
				entry_point_selector: '0x120ae4faee4a97bc466bde8ca3c7db157f3cf16e8a66acf49c2c4d0a068e89c',
				type: APITransactionType.INVOKE_FUNCTION,
				calldata: [accountId, token1Amount, token2Amount],
			});

			dispatch({
				type: ActionTypes.SET_ACTIVE_TRANSACTION,
				payload: {
					id: result.tx_id.toString(),
					type: TransactionType.MINT,
					args: {
						accountId,
						token1Amount,
						token2Amount,
					},
					timestamp: dayjs().toString(),
				},
			});

			return result;
		},
	);

	const { isStopped, data, error } = useTxStatus(mintData?.tx_id);

	return {
		mutate,
		txStatus: data,
		isStopped,
		data: mintData,
		error: mintError || error,
		mintLoading: mintIsLoading,
	};
};
