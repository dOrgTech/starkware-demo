import { ConversionRate, Token, TokenBalance } from 'models/Token';
import { useTokenBalances } from '../services/API/token/hooks/useTokenBalances';
import { getConversionRate } from '../utils/rates';

export const useConversionError = (
	token?: Token,
	amount?: string,
	limit?: string,
): string | undefined => {
	if (!token) return 'Select a token';
	if (!amount) return 'Enter an amount';

	// TODO: implement big number once we have the API
	if (limit && Number(amount) > Number(limit)) {
		return `Insufficient ${token.symbol}`;
	}

	return undefined;
};

export const useBalance = (token?: Token): TokenBalance | undefined => {
	const { data: tokenBalances } = useTokenBalances();
	return tokenBalances?.find((tokenBalance) => tokenBalance.token.symbol === token?.symbol);
};

export const useConversionRates = (fromToken?: Token, toToken?: Token): ConversionRate => {
	if (!fromToken || !toToken) {
		return { from: 1, to: 1 };
	}

	// TODO: implement big number once we have the API
	return getConversionRate(fromToken.price, toToken.price);
};

export const useMintError = (token?: Token, amount?: string): string | undefined => {
	if (!token) return 'Select a token';
	if (!amount) return 'Enter an amount';

	return undefined;
};
