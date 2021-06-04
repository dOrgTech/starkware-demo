import React from 'react';
import { useQuery } from 'react-query';
import { callContract } from '../utils/callContract';
import { UserContext } from 'context/user';
import { CONTRACT_ADDRESS, tokens } from '../../../constants';
import { useSnackbar } from 'notistack';

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
							entry_point_selector:
								'0x37cad3b31fe9762e3caec6c2649772a660084f23004801193311ff36dc54fe',
						}),
					),
				);

				for (let index = 0; index < balancesInformation.length; index++) {
					const token = tokens[index];
					const { data: balanceInformation } = balancesInformation[index];
					balances.set(token.id, String(balanceInformation.result[0]));
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