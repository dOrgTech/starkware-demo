import { useSnackbar } from 'notistack';

export const useTxNotifications = () => {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	return {
		closeSnackbar,
		showPendingTransaction: () => {
			enqueueSnackbar('Transaction Pending...', { variant: 'info', persist: true });
		},
		showSuccess: () => {
			enqueueSnackbar('Transaction Successful!', { variant: 'success' });
		},
		showError: () => {
			enqueueSnackbar('Transaction Failed.', { variant: 'error' });
		},
	};
};
