import { httpClient } from './http';
import { CallArgs } from '../types';

export const callContract = async ({
	contract_address,
	calldata,
	entry_point_selector,
	blockId,
}: CallArgs) => {
	const data = await httpClient.post<Omit<CallArgs, 'blockId'>, unknown>(
		`feeder_gateway/call_contract?blockId=${blockId}`,
		{
			calldata,
			contract_address,
			entry_point_selector,
		},
	);

	return data;
};
