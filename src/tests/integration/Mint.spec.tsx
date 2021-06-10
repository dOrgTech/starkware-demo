import React from 'react';
import '@testing-library/jest-dom';

import { customRender, screen, fireEvent, within } from '../utils';
import { Mint } from '../../components/Mint';

describe('Mint', () => {
	const setupMintToken = async () => {
		const { container } = customRender(<Mint />);
		fireEvent.click(screen.getAllByRole('button', { name: /Select a Token/i })[0]);
		const dialog = screen.getByRole('presentation');
		fireEvent.click(within(dialog).getByText(/TK1/i));
		return container;
	};

	it('displays empty token selector initially', () => {
		const { container } = customRender(<Mint />);
		expect(container).toMatchSnapshot();
	});

	it('can select mint token', async () => {
		const container = await setupMintToken();
		expect(container).toMatchSnapshot();
	});

	it('can change mint amount', async () => {
		const container = await setupMintToken();
		fireEvent.change(screen.getByDisplayValue('1000'), {
			target: { value: '500' },
		});
		expect(container).toMatchSnapshot();
	});
});
