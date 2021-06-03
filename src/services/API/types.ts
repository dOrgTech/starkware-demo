export enum TransactionResponseCode {
	TRANSACTION_RECEIVED = 'TRANSACTION_RECEIVED',
}

export enum APITransactionType {
	INVOKE_FUNCTION = 'INVOKE_FUNCTION',
	DEPLOY = 'DEPLOY',
}

export enum TransactionStatus {
	PENDING = 'PENDING',
	REJECTED = 'REJECTED',
	CONFIRMED = 'CONFIRMED',
}

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
