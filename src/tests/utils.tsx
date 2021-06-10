import React from 'react';
import { createGenerateClassName, StylesProvider } from '@material-ui/core/styles';
import { render as tlRender, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

/**
 * Styles and query client wrapper for the tests
 * @param children UI element to render
 * @see https://javascript.plainenglish.io/snapshots-of-material-ui-styled-component-with-react-testing-library-and-typescript-d82d7d926d2c
 */
const AppWrapper: React.FC = ({ children }) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});

	const generateClassName = createGenerateClassName({
		disableGlobal: true,
		productionPrefix: 'test',
	});

	return (
		<QueryClientProvider client={queryClient}>
			<StylesProvider generateClassName={generateClassName}>{children}</StylesProvider>
		</QueryClientProvider>
	);
};

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
	tlRender(ui, { wrapper: AppWrapper, ...options });

export * from '@testing-library/react';

export { customRender };
