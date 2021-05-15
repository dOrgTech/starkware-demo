import { useQuery } from 'react-query';
import { HTTPClient } from '../../http';

export interface StorageArgs {
	contractAddress: string;
	key: string;
}

interface StorageResult {
	value: unknown;
}

export const useStorageAt = (args: StorageArgs) => {
	return useQuery<StorageResult, Error>(['storageAt', args], async () => {
		//TODO
		const httpClient = HTTPClient.create('', { timeout: 500, headers: {} });
		const { data } = await httpClient.get('');

		return data;
	});
};
