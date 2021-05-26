import { Token } from './token';

export interface SwapReceipt {
	id: string;
	token: Pick<Token, 'symbol' | 'icon'>;
	amount: string;
}
