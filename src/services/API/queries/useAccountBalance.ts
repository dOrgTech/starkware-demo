import React from 'react';
import { useQuery } from 'react-query';
import { callContract } from '../utils/callContract';
import { UserContext } from 'context/user';
import { tokens } from '../../../constants';

interface BalancesFetchResult {
	result: number[];
}

const contractAddress = '0x0000000000000000000000000000000000000000000000000000000000000005';

export const useAccountBalance = (blockId?: string) => {
	const {
		state: { userId },
	} = React.useContext(UserContext);

	return useQuery(
		['accountBalance', userId, blockId],
		async () => {
			const balances = new Map<string, string>();

			const balancesInformation = await Promise.all(
				tokens.map(({ id }) =>
					callContract<BalancesFetchResult>({
						contract_address: contractAddress,
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
		},
		{
			refetchOnMount: false,
			retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 60000),
		},
	);
};
