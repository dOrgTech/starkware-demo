import { Token } from '../models/token';
import { useAccountBalance } from '../services/API/queries/useAccountBalance';
import { tokens } from '../constants';

export const useTokenBalance = (token?: Token): string | undefined => {
	const { data: tokenBalances } = useAccountBalance();
	if (!token) return;
	return tokenBalances?.get(token.id);
};

export const useFilteredTokens = (toFilter?: Token) => {
	if (!toFilter) return tokens;
	return tokens.filter(({ id }) => id !== toFilter.id);
};
