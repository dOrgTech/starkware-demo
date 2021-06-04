import { useQuery } from 'react-query';
import BigNumber from 'bignumber.js';
import { httpClient } from '../utils/http';

export interface StorageArgs {
	contractAddress: string;
	key: string;
	blockId: string | null;
}

export const useStorageAt = (args: StorageArgs) => {
	return useQuery<string, Error>(
		['storageAt', args.contractAddress, args.key, args.blockId],
		async () => {
			const contractNumber = new BigNumber(args.contractAddress).toNumber();
			const { data } = await httpClient.get<string>(
				`feeder_gateway/get_storage_at?contractAddress=${contractNumber}&key=${args.key}&blockId=${args.blockId}`,
			);
			return data;
		},
	);
};
