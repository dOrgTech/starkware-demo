import { CONTRACT_ADDRESS, GET_POOL_TOKEN_BALANCE_ENTRYPOINT } from '../../../constants';
import { useQuery } from 'react-query';
import { callContract } from '../utils/callContract';

interface PoolBalanceArgs {
	blockId: string;
	tokenType: string;
}

export const usePoolBalance = (args: PoolBalanceArgs) => {
	return useQuery(['poolBalance', args.blockId], async () => {
		const result = await callContract({
			contract_address: CONTRACT_ADDRESS,
			blockId: args.blockId,
			calldata: [args.tokenType],
			entry_point_selector: GET_POOL_TOKEN_BALANCE_ENTRYPOINT,
		});

		return result;
	});
};
