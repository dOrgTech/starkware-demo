import { useQuery } from 'react-query';
import TokenSVG from 'assets/tokens/token.svg';
import Token2SVG from 'assets/tokens/token2.svg';
import { Token } from '../types';

export const useTokens = () => {
	return useQuery<Token[], Error>('tokens', () => {
		const tokens = [
			{
				id: '1',
				name: 'Token 1',
				symbol: 'TK1',
				icon: TokenSVG,
				price: '2',
				color: '#FE9493',
			},
			{
				id: '2',
				name: 'Token 2',
				symbol: 'TK2',
				icon: Token2SVG,
				price: '1',
				color: '#48C8FF',
			},
		];

		return tokens;
	});
};
