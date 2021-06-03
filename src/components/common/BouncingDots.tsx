import { Box, BoxProps, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() => ({
	bouncingDotContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	bouncingDot: {
		width: 14,
		height: 14,
		borderRadius: '50%',
		margin: 6,
		background: '#78B1FC',
		animation: '$bounce 0.4s infinite alternate',
		'&:nth-child(2)': {
			background: '#FB514F',
			animationDelay: '0.1s',
		},
		'&:nth-child(3)': {
			background: '#F9F7F5',
			animationDelay: '0.2s',
		},
	},
	'@keyframes bounce': {
		to: {
			transform: 'translate(0, -6px)',
		},
	},
}));

export const BouncingDots = ({ className, ...props }: BoxProps) => {
	const classes = useStyles();

	return (
		<Box {...props} className={`${classes.bouncingDotContainer} ${className || ''}`}>
			<Box className={classes.bouncingDot} />
			<Box className={classes.bouncingDot} />
			<Box className={classes.bouncingDot} />
		</Box>
	);
};
