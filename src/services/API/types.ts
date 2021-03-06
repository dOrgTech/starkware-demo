export enum TransactionResponseCode {
	TRANSACTION_RECEIVED = 'TRANSACTION_RECEIVED',
}

export enum APITransactionType {
	INVOKE_FUNCTION = 'INVOKE_FUNCTION',
	DEPLOY = 'DEPLOY',
}

export type TransactionStatus =
	| {
			tx_status: 'RECEIVED';
	  }
	| {
			tx_status: 'PENDING';
			block_id: string;
	  }
	| {
			tx_status: 'REJECTED';
	  }
	| {
			tx_status: 'ACCEPTED_ONCHAIN';
	  };

export interface TransactionArgs {
	calldata: string[];
	contract_address: string;
	entry_point_selector: string;
	type: APITransactionType;
}

export interface CallArgs {
	calldata: string[];
	contract_address: string;
	entry_point_selector: string;
	blockId: string | null;
}

export interface TransactionResponse {
	code: TransactionResponseCode;
	tx_id: number;
}
