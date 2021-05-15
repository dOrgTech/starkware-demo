import { useMutation } from 'react-query';
import { HTTPClient } from 'services/http';

export interface TransactionArgs {
	contractAddress: string;
	function: string;
	data: [];
}

interface TransactionResult {
	txId: number;
}

export const useSendTransaction = () => {
	return useMutation<TransactionResult, Error, TransactionArgs>(async (args) => {
		//TODO
		const httpClient = HTTPClient.create('', { timeout: 500, headers: {} });
		return httpClient.post('', args);
	});
};
