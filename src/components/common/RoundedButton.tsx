import React from 'react';
import { Button, ButtonProps, createStyles, makeStyles } from '@material-ui/core';

const useButtonStyles = makeStyles(() =>
	createStyles({
		root: {
			borderRadius: 50,
		},
		label: {
			fontSize: 12,
			maxWidth: 95,
			height: 16,
		},
	}),
);

export const RoundedButton = (props: ButtonProps) => {
	const buttonStyles = useButtonStyles();

	return <Button color="secondary" variant="outlined" classes={buttonStyles} {...props} />;
};
