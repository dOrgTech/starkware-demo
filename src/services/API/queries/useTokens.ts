import { useQuery } from 'react-query';
import { Token } from 'models/token';
import { ReactComponent as TokenSVG } from '../../../assets/tokens/token.svg';
import { ReactComponent as Token2SVG } from '../../../assets/tokens/token2.svg';

export const useTokens = () => {
	// TODO: replace this with actual API call once we have it available
	return useQuery<Token[], Error>(
		'tokens',
		() =>
			new Promise<Token[]>((resolve) => {
				setTimeout(
					() =>
						resolve([
							{
								id: '1',
								name: 'Token 1',
								symbol: 'TK1',
								icon: TokenSVG,
								price: '2',
							},
							{
								id: '2',
								name: 'Token 2',
								symbol: 'TK2',
								icon: Token2SVG,
								price: '1',
							},
						]),
					3000,
				);
			}),
	);
};
