import { INIT_POOL_ENTRYPOINT, CONTRACT_ADDRESS } from '../../../constants';
import { useMutation } from 'react-query';
import { callContract } from '../utils/callContract';
interface InitPool {
	tokensId: string[];
	blockId?: string;
}

export const useInitPool = ({ tokensId, blockId }: InitPool) => {
	return useMutation(['invoke', tokensId, blockId], () =>
		callContract({
			blockId: blockId || null,
			contract_address: CONTRACT_ADDRESS,
			calldata: tokensId,
			entry_point_selector: INIT_POOL_ENTRYPOINT,
		}),
	);
};
