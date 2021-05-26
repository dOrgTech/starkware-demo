import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { NotificationsContext } from '../../context/notifications';
import Logo from 'assets/logo.svg';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		backdrop: {
			zIndex: theme.zIndex.drawer + 1,
			color: '#fff',
		},
		spinningLogo: {
			height: 128,
			animation: '$spin 2s linear 0s infinite',
		},
		'@keyframes spin': {
			from: {
				transform: 'rotate(0deg)',
			},
			to: {
				transform: 'rotate(360deg)',
			},
		},
	}),
);

export const SplashLoader = () => {
	const {
		state: { loading },
	} = React.useContext(NotificationsContext);
	const classes = useStyles();

	return (
		<Backdrop className={classes.backdrop} open={loading}>
			<img className={classes.spinningLogo} src={Logo} alt="Loading Content" />
		</Backdrop>
	);
};
