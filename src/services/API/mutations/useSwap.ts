import { useMutation } from 'react-query';
import { TransactionResponse, TransactionType } from '../types';
import { sendTransaction } from '../utils/sendTransaction';

const contractAddress = '0x0000000000000000000000000000000000000000000000000000000000000005';

interface SwapInformation {
	tokenId: string;
	amount: string;
}

interface SwapArgs {
	from: SwapInformation;
	to: SwapInformation;
	blockId?: string;
}

const useSwap = () => {
	return useMutation<TransactionResponse, Error, SwapArgs>(({ from, to, blockId }) =>
		sendTransaction({
			contract_address: contractAddress,
			entry_point_selector: '0x15543c3708653cda9d418b4ccd3be11368e40636c10c44b18cfe756b6d88b29',
			type: TransactionType.INVOKE_FUNCTION,
			calldata: ['idx', from.tokenId, from.amount, to.amount],
		}),
	);
};
