import React from 'react';
import '@testing-library/jest-dom';

import { customRender, screen, fireEvent } from './utils';
import TokenSVG from '../assets/tokens/token.svg';
import Token2SVG from '../assets/tokens/token2.svg';
import { TokenSelectDialog } from '../components/TokenSelectDialog';

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

describe('TokenSelectorDialog', () => {
	it('displays list of tokens', () => {
		const { baseElement } = customRender(
			<TokenSelectDialog open={true} tokens={options} handleSelect={jest.fn} onClose={jest.fn()} />,
		);
		expect(baseElement).toMatchSnapshot();
	});

	it('triggers close handler', () => {
		const closeHandlerMock = jest.fn();
		customRender(
			<TokenSelectDialog
				open={true}
				tokens={options}
				handleSelect={jest.fn}
				onClose={closeHandlerMock}
			/>,
		);
		fireEvent.click(screen.getByLabelText('close'));
		expect(closeHandlerMock).toHaveBeenCalledTimes(1);
	});

	it('triggers select handler', () => {
		const selectHandlerMock = jest.fn();
		customRender(
			<TokenSelectDialog
				open={true}
				tokens={options}
				handleSelect={selectHandlerMock}
				onClose={jest.fn()}
			/>,
		);
		fireEvent.click(screen.getByText(options[0].symbol));
		expect(selectHandlerMock).toHaveBeenNthCalledWith(1, options[0]);
	});
});
