import { useQuery } from 'react-query';
import { useSnackbar } from 'notistack';

import { callContract } from '../utils/callContract';
import { CONTRACT_ADDRESS, GET_POOL_TOKEN_BALANCE_ENTRYPOINT, tokens } from '../../../constants';
import BigNumber from 'bignumber.js';

interface PoolBalanceFetchResult {
	result: number[];
}

export const usePoolBalance = (blockId?: string) => {
	const { enqueueSnackbar } = useSnackbar();

	return useQuery(
		['poolBalance', blockId],
		async () => {
			try {
				const balances = new Map<string, string>();

				const balancesInformation = await Promise.all(
					tokens.map(({ id }) =>
						callContract<PoolBalanceFetchResult>({
							contract_address: CONTRACT_ADDRESS,
							blockId: blockId || null,
							calldata: [id],
							entry_point_selector: GET_POOL_TOKEN_BALANCE_ENTRYPOINT,
						}),
					),
				);

				for (let index = 0; index < balancesInformation.length; index++) {
					const token = tokens[index];
					const { data: balanceInformation } = balancesInformation[index];
					balances.set(token.id, new BigNumber(balanceInformation.result[0], 16).toString());
				}

				return balances;
			} catch (error) {
				enqueueSnackbar('There was a problem getting pool information', { variant: 'error' });
				throw error;
			}
		},
		{
			retry: false,
			retryOnMount: false,
			refetchInterval: 10000,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			staleTime: 10000,
		},
	);
};
