import { useQuery } from 'react-query';
import { callContract } from '../utils/callContract';

interface PoolBalanceArgs {
	contract_address: string;
	blockId: string;
	tokenType: string;
}

export const usePoolBalance = (args: PoolBalanceArgs) => {
	return useQuery(['poolBalance', args.contract_address, args.blockId], async () => {
		const result = await callContract({
			contract_address: args.contract_address,
			blockId: args.blockId,
			calldata: [args.tokenType],
			entry_point_selector: '0x16e4228de742ad20548b3f6858e964491cf085bdf3db000d2b9eb979b8ac15d',
		});

		return result;
	});
};
