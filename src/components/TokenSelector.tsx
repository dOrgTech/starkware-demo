import React, { useState, useCallback } from 'react';
import { Box, Grid, IconButton, styled, Typography } from '@material-ui/core';

import { Token } from 'models/token';
import { TokenIcon } from './common/TokenIcon';
import { TokenSelectDialog } from './TokenSelectDialog';
import { RoundedButton } from './common/RoundedButton';
import { ReactComponent as DropdownArrow } from 'assets/icons/dropdown-arrow.svg';
import { ReactComponent as PlaceholderToken } from 'assets/tokens/placeholder.svg';

const StyledTokenContainer = styled(Box)({
	width: '100%',
	height: '100%',
});

const StyledTokenSymbol = styled(Box)(({ theme }) => ({
	boxSizing: 'border-box',
	[theme.breakpoints.up('md')]: {
		paddingLeft: 12,
	},
}));

const StyledTypography = styled(Typography)({
	fontWeight: 600,
});

interface Props {
	value?: Token;
	options: Token[];
	onChange: (token: Token) => void;
}

export const SelectedToken: React.FC<{ token: Token }> = ({ token, children }) => (
	<Grid item>
		<StyledTokenContainer>
			<Grid container alignItems="center" spacing={1}>
				<Grid item>
					<TokenIcon icon={token.icon} size="medium" />
				</Grid>
				<Grid item xs>
					<StyledTokenSymbol>
						<StyledTypography color="textPrimary">{token.symbol}</StyledTypography>
					</StyledTokenSymbol>
				</Grid>
				<Grid item>{children}</Grid>
			</Grid>
		</StyledTokenContainer>
	</Grid>
);

export const TokenSelector = ({ value: token, onChange, options }: Props): JSX.Element => {
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
				<RoundedButton onClick={handleClick}>Select a Token</RoundedButton>
			</Grid>
		</Grid>
	);

	return (
		<>
			<Grid container alignItems="center">
				{token ? (
					<SelectedToken token={token}>
						<IconButton aria-label="change token" onClick={handleClick}>
							<DropdownArrow />
						</IconButton>
					</SelectedToken>
				) : (
					<Selector />
				)}
			</Grid>
			<TokenSelectDialog
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
