import { Token } from './token';

export interface SwapInformation {
	token: Token;
	amount: string;
}

export interface SwapReceipt {
	from: SwapInformation;
	to: SwapInformation;
}
