import { useQuery } from 'react-query';
import { httpClient } from '../utils/http';

export const useTxStatus = (id: string) => {
	return useQuery(['txStatus', id], () =>
		httpClient.get<string>(`feeder_gateway/get_transaction_status?transactionId=${id}`),
	);
};
