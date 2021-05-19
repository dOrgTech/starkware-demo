import React, { useCallback } from 'react';
import { Box, Grid, IconButton, styled, Typography } from '@material-ui/core';

import { TokenIcon } from './common/TokenIcon';
import { ReactComponent as DropdownArrow } from 'assets/icons/dropdown-arrow.svg';
import { ReactComponent as PlaceholderToken } from 'assets/tokens/placeholder.svg';
import { TokenSelectDialog } from './TokenSelectDialog';
import { useState } from 'react';
import { Token } from 'models/Token';
import { RoundedButton } from './common/RoundedButton';

const StyledTokenContainer = styled(Box)({
	width: '100%',
	height: '100%',
});

const StyledTokenSymbol = styled(Box)({
	boxSizing: 'border-box',
	paddingLeft: 12,
});

const StyledTypography = styled(Typography)({
	fontWeight: 600,
});

interface Props {
	value?: Token;
	options: Token[];
	onChange: (token: Token) => void;
}

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

	const SelectedToken = ({ token }: { token: Token }) => (
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
					<Grid item>
						<IconButton aria-label="change token" onClick={handleClick}>
							<DropdownArrow />
						</IconButton>
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
