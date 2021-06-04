import { TransactionArgs } from '../types';
import { httpClient } from './http';

export const sendTransaction = async ({
	contract_address,
	calldata,
	entry_point_selector,
	type,
}: TransactionArgs) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const { data } = await httpClient.post<TransactionArgs, any>(`gateway/add_transaction`, {
		calldata,
		contract_address,
		entry_point_selector,
		type,
	});

	return data;
};
