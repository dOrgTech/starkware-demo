import React from 'react';
import '@testing-library/jest-dom';

import { customRender, screen, fireEvent } from '../utils';
import { Swap } from '../../components/Swap';

describe('Swap', () => {
	it('can swap tokens direction', async () => {
		const { container } = customRender(<Swap />);
		fireEvent.click(screen.getByRole('button', { name: /invert tokens swap direction/i }));
		expect(container).toMatchSnapshot();
	});

	it('can change tokens amounts', async () => {
		const { container } = customRender(<Swap />);
		fireEvent.change(screen.getByLabelText(/amount of token to swap/i), {
			target: { value: '100' },
		});
		expect(container).toMatchSnapshot();
	});
});
