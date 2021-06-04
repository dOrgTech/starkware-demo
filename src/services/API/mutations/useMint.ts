import { ADD_DEMO_TOKEN_ENTRYPOINT, CONTRACT_ADDRESS } from '../../../constants';
import { useMutation } from 'react-query';
import dayjs from 'dayjs';
import { APITransactionType, TransactionResponse } from '../types';
import { sendTransaction } from '../utils/sendTransaction';
import { useContext } from 'react';
import { ActionTypes, TransactionType, UserContext } from 'context/user';
import { useActiveTxStatus } from '../queries/useActiveTxStatus';
import { MintInformation } from '../../../models/mint';
import { useTxNotifications } from '../../../hooks/notifications';

export interface MintArgs {
	mint1: MintInformation;
	mint2?: MintInformation;
}

export const useMint = () => {
	const {
		dispatch,
		state: { userId },
	} = useContext(UserContext);
	const { showPendingTransaction } = useTxNotifications();

	const {
		mutate,
		data: mintData,
		error: mintError,
		isLoading: mintIsLoading,
	} = useMutation<TransactionResponse, Error, MintArgs>(async (args) => {
		const result = await sendTransaction({
			contract_address: CONTRACT_ADDRESS,
			entry_point_selector: ADD_DEMO_TOKEN_ENTRYPOINT,
			type: APITransactionType.INVOKE_FUNCTION,
			calldata: [userId, args.mint1.amount, args.mint2?.amount || '0'],
		});

		showPendingTransaction();
		dispatch({
			type: ActionTypes.SET_ACTIVE_TRANSACTION,
			payload: {
				id: result.tx_id.toString(),
				type: TransactionType.MINT,
				args,
				timestamp: dayjs().toString(),
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
