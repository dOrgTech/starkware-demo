import BigNumber from 'bignumber.js';
import { ConversionRate, Token } from 'models/token';
import { usePoolBalance } from '../services/API/queries/usePoolBalance';
import { calculateSwapValue } from '../utils/swap';

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

export const useConversionRates = (
	fromToken?: Token,
	toToken?: Token,
): ConversionRate | undefined => {
	const { data: poolBalance } = usePoolBalance();
	const poolFromBalance = fromToken ? poolBalance?.get(fromToken.id) : undefined;
	const poolToBalance = toToken ? poolBalance?.get(toToken.id) : undefined;

	if (!fromToken || !toToken || !poolFromBalance || !poolToBalance) return;

	return {
		from: calculateSwapValue(poolFromBalance, poolToBalance, '1'),
		to: calculateSwapValue(poolToBalance, poolFromBalance, '1'),
	};
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
