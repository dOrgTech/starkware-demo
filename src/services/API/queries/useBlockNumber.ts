import { useQuery } from 'react-query';
import { HTTPClient } from 'services/http';

export const useBlockNumber = () => {
	return useQuery<number, Error>('blockNumber', async () => {
		//TODO
		const httpClient = HTTPClient.create('', { timeout: 500, headers: {} });
		const { data } = await httpClient.get('');
		return data;
	});
};
