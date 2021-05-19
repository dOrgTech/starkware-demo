import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core';

import App from 'App';
import { BrowserRouter as Router } from 'react-router-dom';
import { theme } from 'theme/theme';
import reportWebVitals from './reportWebVitals';
import './assets/css/body.css';
import { NotificationsProvider } from 'context/notifications';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

ReactDOM.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<Router>
					<NotificationsProvider>
						<App />
					</NotificationsProvider>
				</Router>
			</ThemeProvider>
		</QueryClientProvider>
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
