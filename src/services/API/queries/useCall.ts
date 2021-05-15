import { useQuery } from 'react-query';
import { HTTPClient } from 'services/http';

export interface CallArgs {
	contractAddress: string;
	function: string;
	data: [];
}

interface CallResult {
	data: unknown;
}

export const useCall = (args: CallArgs) => {
	return useQuery<CallResult, Error>(['call', args], async () => {
		//TODO
		const httpClient = HTTPClient.create('', { timeout: 500, headers: {} });
		const { data } = await httpClient.get('');

		return data;
	});
};
