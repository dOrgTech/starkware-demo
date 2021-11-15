import React from 'react';
import { useQuery } from 'react-query';
import { callContract } from '../utils/callContract';
import { UserContext } from 'context/user';
import { CONTRACT_ADDRESS, GET_ACCOUNT_TOKEN_BALANCE_ENTRYPOINT, tokens } from '../../../constants';
import { useSnackbar } from 'notistack';
import BigNumber from 'bignumber.js';

interface BalancesFetchResult {
	result: number[];
}

export const useAccountBalance = (blockId?: string) => {
	const {
		state: { userId },
	} = React.useContext(UserContext);
	const { enqueueSnackbar } = useSnackbar();

	return useQuery(
		['accountBalance', userId, blockId],
		async () => {
			try {
				const balances = new Map<string, string>();

				const balancesInformation = await Promise.all(
					tokens.map(({ id }) =>
						callContract<BalancesFetchResult>({
							contract_address: CONTRACT_ADDRESS,
							blockId: blockId || null,
							calldata: [userId, id],
							entry_point_selector: GET_ACCOUNT_TOKEN_BALANCE_ENTRYPOINT,
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
				enqueueSnackbar('There was a problem getting account information', { variant: 'error' });
				throw error;
			}
		},
		{
			retry: false,
			retryOnMount: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			staleTime: 10000,
		},
	);
};
