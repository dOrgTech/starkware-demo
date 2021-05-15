import React from 'react';
import '@testing-library/jest-dom';
import { customRender, fireEvent, screen } from './utils';
import { NumericInput } from '../components/NumericInput';

describe('NumericInput', () => {
	it('displays placeholder', () => {
		const { container } = customRender(<NumericInput placeholder={'0.123'} handleChange={jest.fn()} />);
		expect(container).toMatchSnapshot();
	});

	it('handles valid change', () => {
		const handleChange = jest.fn();
		customRender(<NumericInput placeholder={'0.123'} handleChange={handleChange} />);
		fireEvent.change(screen.getByRole('textbox'), { target: { value: '123' } });
		expect(handleChange).toHaveBeenNthCalledWith(1, '123');
	});

	it('skips invalid change', () => {
		const handleChange = jest.fn();
		customRender(<NumericInput placeholder={'0.123'} handleChange={handleChange} />);
		fireEvent.change(screen.getByRole('textbox'), { target: { value: 'asd' } });
		expect(handleChange).not.toHaveBeenCalled();
	});
});
