import React from 'react';
import { SnackbarKey, SnackbarProvider as MaterialSnackbarProvider, useSnackbar } from 'notistack';
import { IconButton, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close as IconClose } from '@material-ui/icons';

import TxLoader from 'assets/gifs/loading_tx.gif';
import SuccessIcon from 'assets/icons/success.svg';
import ErrorIcon from 'assets/icons/error.svg';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		[theme.breakpoints.up('sm')]: {
			minWidth: 350,
		},
	},
	success: {
		backgroundColor: theme.palette.success.main,
		fontSize: `18px !important`,
	},
	error: {
		backgroundColor: theme.palette.error.main,
		fontSize: `18px !important`,
	},
	info: {
		backgroundColor: theme.palette.info.main,
		fontSize: `18px !important`,
	},
	loader: {
		width: 22,
		height: 22,
		marginRight: 9,
	},
	icon: {
		width: 16,
		height: 16,
		marginRight: 9,
	},
	close: {
		width: 18,
		height: 18,
		color: theme.palette.text.primary,
	},
}));

const SnackbarCloseButton = ({ snackbarKey }: { snackbarKey: SnackbarKey }): JSX.Element => {
	const classes = useStyles();
	const { closeSnackbar } = useSnackbar();

	return (
		<IconButton onClick={() => closeSnackbar(snackbarKey)}>
			<IconClose className={classes.close} />
		</IconButton>
	);
};

export const SnackbarProvider: React.FC = ({ children }) => {
	const classes = useStyles();

	return (
		<MaterialSnackbarProvider
			action={(key) => <SnackbarCloseButton snackbarKey={key} />}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			classes={{
				root: classes.root,
				variantSuccess: classes.success,
				variantError: classes.error,
				variantInfo: classes.info,
			}}
			iconVariant={{
				info: <img className={classes.loader} src={TxLoader} alt="success tx icon" />,
				success: <img className={classes.icon} src={SuccessIcon} alt="success tx icon" />,
				error: <img className={classes.icon} src={ErrorIcon} alt="success tx icon" />,
			}}
			maxSnack={3}
		>
			{children}
		</MaterialSnackbarProvider>
	);
};
