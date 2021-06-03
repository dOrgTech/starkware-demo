import { CONTRACT_ADDRESS } from '../../../constants';
import { useMutation } from 'react-query';
import { APITransactionType, TransactionResponse } from '../types';
import { sendTransaction } from '../utils/sendTransaction';
import { useContext } from 'react';
import { ActionTypes, TransactionType, UserContext } from 'context/user';
import { useActiveTxStatus } from '../queries/useActiveTxStatus';
import { MintInformation } from '../../../models/mint';

export interface MintArgs {
	mint1: MintInformation;
	mint2?: MintInformation;
}

export const useMint = () => {
	const {
		dispatch,
		state: { userId },
	} = useContext(UserContext);

	const {
		mutate,
		data: mintData,
		error: mintError,
		isLoading: mintIsLoading,
	} = useMutation<TransactionResponse, Error, MintArgs>(async ({ mint1, mint2 }) => {
		const result = await sendTransaction({
			contract_address: CONTRACT_ADDRESS,
			entry_point_selector: '0x120ae4faee4a97bc466bde8ca3c7db157f3cf16e8a66acf49c2c4d0a068e89c',
			type: APITransactionType.INVOKE_FUNCTION,
			calldata: [userId, mint1.amount, mint2?.amount || '0'],
		});

		dispatch({
			type: ActionTypes.SET_ACTIVE_TRANSACTION,
			payload: {
				id: result.tx_id.toString(),
				type: TransactionType.MINT,
				args: {
					mint1: mint1,
					mint2: mint2,
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
		data: mintData,
		error: mintError || error,
		mintLoading: mintIsLoading,
	};
};
