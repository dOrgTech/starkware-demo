import { useMutation } from 'react-query';
import { callContract } from '../utils/callContract';

const contractAddress = '0x0000000000000000000000000000000000000000000000000000000000000005';

interface InitPool {
	tokensId: string[];
	blockId?: string;
}

export const useInitPool = ({ tokensId, blockId }: InitPool) => {
	return useMutation(['invoke', tokensId, blockId], () =>
		callContract({
			blockId: blockId || null,
			contract_address: contractAddress,
			calldata: tokensId,
			entry_point_selector: '0x1dc1eb7761a78446bf98ac6ddfb04807165ba0e9aa93ff49b7bace0d24c3522',
		}),
	);
};
