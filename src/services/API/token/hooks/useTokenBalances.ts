import { useQuery } from 'react-query';
import { TokenBalance } from '../types';
import TokenSVG from 'assets/tokens/token.svg';
import Token2SVG from 'assets/tokens/token2.svg';

const useWallet = () => ({ address: '0x0' });

export const useTokenBalances = () => {
	const { address } = useWallet();

	return useQuery<TokenBalance[], Error>(['balances', address], () => {
		return [
			{
				token: {
					id: '1',
					name: 'Token 1',
					symbol: 'TK1',
					icon: TokenSVG,
					price: '2',
					color: '#FE9493',
				},
				amount: '1000',
			},
			{
				token: {
					id: '2',
					name: 'Token 2',
					symbol: 'TK2',
					icon: Token2SVG,
					price: '1',
					color: '#48C8FF',
				},
				amount: '250',
			},
		];
	});
};
