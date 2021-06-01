import React from 'react';
import { useQuery } from 'react-query';
import { callContract } from '../utils/callContract';
import { UserContext } from 'context/user';

const contractAddress = '0x0000000000000000000000000000000000000000000000000000000000000005';

interface BalanceArgs {
	blockId?: string;
}

export const useAccountBalance = ({ blockId }: BalanceArgs) => {
	const {
		state: { userId },
	} = React.useContext(UserContext);

	return useQuery(['accountBalance', blockId], () =>
		Promise.all([
			callContract({
				contract_address: contractAddress,
				blockId: blockId || null,
				calldata: [userId, 'token1'],
				entry_point_selector: '0x37cad3b31fe9762e3caec6c2649772a660084f23004801193311ff36dc54fe',
			}),
			callContract({
				contract_address: contractAddress,
				blockId: blockId || null,
				calldata: [userId, 'token2'],
				entry_point_selector: '0x37cad3b31fe9762e3caec6c2649772a660084f23004801193311ff36dc54fe',
			}),
		]),
	);
};
