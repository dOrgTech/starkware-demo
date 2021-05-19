import React from 'react';
import '@testing-library/jest-dom';

import { customRender, screen, fireEvent, within, waitForElementToBeRemoved } from '../utils';
import { Mint } from '../../components/Mint';

describe('Mint', () => {
	const setupMintToken = async () => {
		const { container } = customRender(<Mint />);
		fireEvent.click(screen.getByRole('button', { name: /Select a Token/i }));
		// TODO: replace name with actual tokens from useQuery
		const dialog = screen.getByRole('presentation');
		fireEvent.click(within(dialog).getByText(/TK1/i));
		await waitForElementToBeRemoved(dialog); // close dialog
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
		fireEvent.change(screen.getByLabelText(/mint amount/i), {
			target: { value: '128' },
		});
		expect(container).toMatchSnapshot();
	});
});
