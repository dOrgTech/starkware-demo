import { httpClient } from './http';
import { CallArgs } from '../types';

export async function callContract<T = Omit<CallArgs, 'blockId'>>({
	contract_address,
	calldata,
	entry_point_selector,
	blockId,
}: CallArgs) {
	return httpClient.post<T>(`feeder_gateway/call_contract?blockId=${blockId}`, {
		calldata,
		contract_address,
		entry_point_selector,
	});
}
