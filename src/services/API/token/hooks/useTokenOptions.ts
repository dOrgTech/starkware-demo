import { useMemo } from 'react';
import { Token } from 'models/token';

export const useTokenOptions = (tokenToFilter?: Token, tokens?: Token[]) => {
	return useMemo(() => {
		if (!tokens) {
			return [];
		}

		if (!tokenToFilter) {
			return tokens;
		}

		return tokens.filter((option) => tokenToFilter.symbol !== option.symbol);
	}, [tokens, tokenToFilter]);
};
