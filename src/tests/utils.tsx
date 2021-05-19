import React from 'react';
import { createGenerateClassName, StylesProvider } from '@material-ui/core/styles';
import { render as tlRender, RenderOptions } from '@testing-library/react';

/**
 * Styles wrapper for the tests
 * @param children UI element to render
 * @see https://javascript.plainenglish.io/snapshots-of-material-ui-styled-component-with-react-testing-library-and-typescript-d82d7d926d2c
 */
const AppStylesWrapper: React.FC = ({ children }) => {
	const generateClassName = createGenerateClassName({
		disableGlobal: true,
		productionPrefix: 'test',
	});

	return <StylesProvider generateClassName={generateClassName}>{children}</StylesProvider>;
};

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
	tlRender(ui, { wrapper: AppStylesWrapper, ...options });

export * from '@testing-library/react';

export { customRender };
