import { TransactionArgs, TransactionResponse } from '../types';
import { httpClient } from './http';

export const sendTransaction = async ({
	contract_address,
	calldata,
	entry_point_selector,
	type,
}: TransactionArgs) => {
	const data = await httpClient.post<TransactionArgs, TransactionResponse>(
		`gateway/add_transaction`,
		{
			calldata,
			contract_address,
			entry_point_selector,
			type,
		},
	);

	return data;
};
