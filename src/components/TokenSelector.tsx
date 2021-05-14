import { Box, Button, createStyles, Grid, makeStyles, styled, Typography } from '@material-ui/core';
import React, { useCallback } from 'react';
import { Token } from 'models/token';
import { TokenIcon } from './common/TokenIcon';
import { ReactComponent as DropdownArrow } from 'assets/icons/dropdown-arrow.svg';
import { ReactComponent as PlaceholderToken } from 'assets/tokens/placeholder.svg';
import { TokenSelectModal } from './TokenSelectModal';
import { useState } from 'react';

const StyledTokenContainer = styled(Box)({
	width: '100%',
	height: '100%',
	cursor: 'pointer',
});

const StyledTokenSymbol = styled(Box)({
	boxSizing: 'border-box',
	paddingLeft: 12,
});

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

interface Props {
	value?: Token;
	options: Token[];
	onChange: (token: Token) => void;
}

export const TokenSelector = ({ value: token, onChange, options }: Props): JSX.Element => {
	const buttonStyles = useButtonStyles();
	const [open, setOpen] = useState(false);

	const handleClick = useCallback(() => {
		setOpen(true);
	}, []);

	const Selector = () => (
		<Grid container alignItems="center" spacing={1}>
			<Grid item>
				<PlaceholderToken />
			</Grid>
			<Grid item xs>
				<Button color="secondary" variant="outlined" classes={buttonStyles} onClick={handleClick}>
					Select a Token
				</Button>
			</Grid>
		</Grid>
	);

	const SelectedToken = ({ token }: { token: Token }) => (
		<Grid item>
			<StyledTokenContainer onClick={handleClick}>
				<Grid container alignItems="center" spacing={1}>
					<Grid item>
						<TokenIcon Icon={token.icon} size="large" />
					</Grid>
					<Grid item xs>
						<StyledTokenSymbol>
							<Typography variant="body1" color="textPrimary">
								{token.symbol}
							</Typography>
						</StyledTokenSymbol>
					</Grid>
					<Grid item>
						<DropdownArrow />
					</Grid>
				</Grid>
			</StyledTokenContainer>
		</Grid>
	);

	return (
		<>
			<Grid container alignItems="center">
				{token ? <SelectedToken token={token} /> : <Selector />}
			</Grid>
			<TokenSelectModal
				open={open}
				onClose={() => setOpen(false)}
				tokens={options}
				handleSelect={(e) => {
					onChange(e);
					setOpen(false);
				}}
			/>
		</>
	);
};
