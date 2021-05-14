import { Button, createStyles, Grid, makeStyles, styled } from '@material-ui/core';
import React, { useCallback } from 'react';
import { Token } from 'models/token';
import { DarkBox } from './common/DarkBox';
import { TokenIcon } from './common/TokenIcon';
import { NumericInput } from './NumericInput';
import { ReactComponent as TokenSVG } from 'assets/tokens/token.svg';
import { TokenSelectModal } from './TokenSelectModal';
import { useState } from 'react';

const StyledInputsContainer = styled(Grid)({
	padding: '0 0 0 12px',
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
	handleSelect: (token: Token) => void;
	tokens: Token[];
}

export const TokenSelector = ({ handleSelect, tokens }: Props): JSX.Element => {
	const buttonStyles = useButtonStyles();
	const [open, setOpen] = useState(false);

	const handleClick = useCallback(() => {
		setOpen(true);
	}, []);

	return (
		<>
			<DarkBox>
				<Grid container alignItems="center">
					<Grid item>
						<TokenIcon Icon={TokenSVG} size="large" />
					</Grid>
					<StyledInputsContainer item xs>
						<Grid container justify="space-between" alignItems="center">
							<Grid item xs>
								<Button
									color="secondary"
									variant="outlined"
									classes={buttonStyles}
									onClick={handleClick}
								>
									Select a Token
								</Button>
							</Grid>
							<Grid item xs>
								<NumericInput onChange={() => false} />
							</Grid>
						</Grid>
					</StyledInputsContainer>
				</Grid>
			</DarkBox>
			<TokenSelectModal
				open={open}
				onClose={() => setOpen(false)}
				tokens={tokens}
				handleSelect={(e) => {
					handleSelect(e);
					setOpen(false);
				}}
			/>
		</>
	);
};
