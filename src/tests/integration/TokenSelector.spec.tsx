import React from 'react';
import '@testing-library/jest-dom';

import { customRender, screen, fireEvent } from '../utils';
import { TokenSelector } from '../../components/TokenSelector';
import TokenSVG from '../../assets/tokens/token.svg';
import Token2SVG from '../../assets/tokens/token2.svg';

const options = [
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

describe('TokenSelector', () => {
	it('displays placeholder selector', () => {
		const { container } = customRender(<TokenSelector options={options} onChange={jest.fn()} />);
		expect(container).toMatchSnapshot();
	});

	it('displays selected token information', () => {
		const { container } = customRender(
			<TokenSelector value={options[0]} options={options} onChange={jest.fn()} />,
		);
		expect(container).toMatchSnapshot();
	});

	it('triggers change handler', () => {
		const handlerMock = jest.fn();
		customRender(<TokenSelector options={options} onChange={handlerMock} />);
		fireEvent.click(screen.getByRole('button'), { name: 'Select a Token' });
		fireEvent.click(screen.getByText(options[0].symbol));
		expect(handlerMock).toHaveBeenNthCalledWith(1, options[0]);
	});
});
