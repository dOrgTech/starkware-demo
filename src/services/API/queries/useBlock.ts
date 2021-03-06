import { useQuery } from 'react-query';
import { httpClient } from '../utils/http';
import { TransactionStatus, APITransactionType } from '../types';

interface BlockArgs {
	blockId: string;
}

interface DeployTransaction {
	contract_address: string;
	type: APITransactionType.DEPLOY;
}

interface InvokeTransaction {
	entry_point_selector: string;
	contract_address: string;
	calldata: string[];
	type: APITransactionType.INVOKE_FUNCTION;
}

interface BlockResponse {
	previous_block_id: number;
	txs: {
		[blockNumber: string]: DeployTransaction | InvokeTransaction;
	};
	status: TransactionStatus;
	state_root: string;
	sequence_number: number;
	block_id: number;
	timestamp: number;
}

export const useBlock = (args: BlockArgs) => {
	return useQuery<BlockResponse, Error>(['block', args.blockId], async () => {
		const { data } = await httpClient.get<BlockResponse>(
			`feeder_gateway/get_block?blockId=${args.blockId}`,
		);
		return data;
	});
};
