import React from 'react';
import { InputBase, InputBaseComponentProps, makeStyles } from '@material-ui/core';

interface Props {
	value?: string;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
	inputProps?: InputBaseComponentProps;
	onChange: (amount: string) => void;
}

const useStyles = makeStyles((theme) => ({
	input: {
		color: theme.palette.text.secondary,
		fontWeight: 'normal',
		[theme.breakpoints.only('xs')]: {
			paddingLeft: theme.spacing(1),
			paddingBottom: theme.spacing(1),
		},
	},
}));

function isValidChange(input: string): boolean {
	// matches one or many digits followed by an optional single "." appearance that's followed by one or more digits
	const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`);
	// remove any non-numeric invalid characters
	const cleanInput = input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	return inputRegex.test(cleanInput);
}

export const NumericInput = ({
	value = '',
	placeholder = '0.00',
	disabled = false,
	className = '',
	inputProps = {},
	onChange,
}: Props): JSX.Element => {
	const classes = useStyles();

	const handleAmountChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		// replace commas with periods
		const input = (event.target.value as string).replace(/,/g, '.');

		if (input === '' || isValidChange(input)) {
			onChange(input);
		}
	};

	return (
		<InputBase
			fullWidth
			type="tel"
			value={value}
			placeholder={placeholder}
			disabled={disabled}
			inputProps={{ ...inputProps, pattern: '^[0-9]*[.,]?[0-9]*$' }}
			className={`${className} ${classes.input}`}
			onChange={handleAmountChange}
		/>
	);
};
