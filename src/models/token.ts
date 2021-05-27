export interface Token {
	id: string;
	name: string;
	symbol: string;
	icon: string;
	price: string;
	color: string;
}

export interface TokenBalance {
	token: Token;
	amount: string;
}

export interface ConversionRate {
	from: number;
	to: number;
}
