import React from 'react';
import '@testing-library/jest-dom';

import { customRender, screen, fireEvent, within, waitForElementToBeRemoved } from '../utils';
import { Swap } from '../../components/Swap';

describe('Swap', () => {
	// Select both "From" and "To" tokens
	const setupSwapTokens = async () => {
		const { container } = customRender(<Swap />);
		fireEvent.click(screen.getByRole('button', { name: /Select a Token/i }));
		// TODO: replace name with actual tokens from useQuery
		const dialog = screen.getByRole('presentation');
		fireEvent.click(within(dialog).getByText(/TK2/i));
		await waitForElementToBeRemoved(dialog); // close dialog
		return container;
	};

	it('displays "From Token" with a default token', () => {
		const { container } = customRender(<Swap />);
		expect(container).toMatchSnapshot();
	});

	it('can select a "To Token"', async () => {
		const container = await setupSwapTokens();
		expect(container).toMatchSnapshot();
	});

	it('does not display the already selected "From Token" as option if it is tried to be changed', () => {
		customRender(<Swap />);
		fireEvent.click(screen.getByRole('button', { name: /change token/i }));
		expect(screen.getByRole('presentation')).toMatchSnapshot();
	});

	it('can tokens swap direction', async () => {
		const container = await setupSwapTokens();
		fireEvent.click(screen.getByRole('button', { name: /invert tokens swap direction/i }));
		expect(container).toMatchSnapshot();
	});

	it('can change swap tokens amounts', async () => {
		const container = await setupSwapTokens();
		fireEvent.change(screen.getByLabelText(/amount of token to swap/i), {
			target: { value: '128' },
		});
		fireEvent.change(screen.getByLabelText(/amount of token to be swapped/i), {
			target: { value: '256' },
		});
		expect(container).toMatchSnapshot();
	});
});
