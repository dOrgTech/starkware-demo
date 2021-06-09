import { ADD_DEMO_TOKEN_ENTRYPOINT, CONTRACT_ADDRESS, tokens } from '../../../constants';
import { useMutation } from 'react-query';
import dayjs from 'dayjs';
import { APITransactionType, TransactionResponse } from '../types';
import { sendTransaction } from '../utils/sendTransaction';
import { useContext } from 'react';
import { ActionTypes, TransactionType, UserContext } from 'context/user';
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

	return useMutation<TransactionResponse, Error, MintArgs>(async (args) => {
		let token1Amount: string;
		let token2Amount: string;

		if (args.mint1.token.id === tokens[0].id) {
			token1Amount = args.mint1.amount;
			token2Amount = args.mint2?.amount || '0';
		} else {
			token2Amount = args.mint1.amount;
			token1Amount = args.mint2?.amount || '0';
		}

		const result = await sendTransaction({
			contract_address: CONTRACT_ADDRESS,
			entry_point_selector: ADD_DEMO_TOKEN_ENTRYPOINT,
			type: APITransactionType.INVOKE_FUNCTION,
			calldata: [userId, token1Amount, token2Amount],
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
};
