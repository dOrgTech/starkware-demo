import React from 'react';
import { Alert } from '@material-ui/lab';
import { CircularProgress, Snackbar, Typography } from '@material-ui/core';
import { UserContext } from '../context/user';

export const PendingTransaction = (): JSX.Element => {
	const {
		state: { activeTransaction },
	} = React.useContext(UserContext);

	return (
		<Snackbar open={!!activeTransaction} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
			<Alert severity="info" style={{ alignItems: 'center', textAlign: 'center' }}>
				<Typography>
					{`There's a pending transaction ${JSON.stringify(activeTransaction)}`}
					<CircularProgress size={20} style={{ color: '#28286E', marginLeft: 10 }} />
				</Typography>
			</Alert>
		</Snackbar>
	);
};
