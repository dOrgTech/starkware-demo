import BigNumber from 'bignumber.js';
import { ConversionRate, Token } from 'models/token';
import { getConversionRate } from '../utils/rates';

export const useConversionError = (
	token?: Token,
	amount?: string,
	limit?: string,
): string | undefined => {
	const inputAmount = new BigNumber(amount || '');

	if (!token) return 'Select a token';
	if (inputAmount.isNaN()) return 'Enter an amount';
	if (inputAmount.isZero()) return 'Enter an amount';

	if (limit && inputAmount.gt(limit)) {
		return `Insufficient ${token.symbol}`;
	}

	return undefined;
};

export const useConversionRates = (fromToken?: Token, toToken?: Token): ConversionRate => {
	if (!fromToken || !toToken) {
		return { from: new BigNumber(1), to: new BigNumber(1) };
	}

	return getConversionRate(fromToken.price, toToken.price);
};

export const useMintError = (token?: Token, amount?: string): string | undefined => {
	const inputAmount = new BigNumber(amount || '');

	if (!token) return 'Select a token';
	if (inputAmount.isNaN()) return 'Enter an amount';
	if (inputAmount.isZero()) return 'Enter an amount';
	if (inputAmount.gt(1000)) {
		return `You can mint up to 1000 ${token.symbol}`;
	}

	return undefined;
};
