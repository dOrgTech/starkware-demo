import { Box, Grid, styled, Typography } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { DarkBox } from './common/DarkBox';
import { TokenIcon } from './common/TokenIcon';
import { NumericInput, NumericInputProps } from './NumericInput';
import { Token } from 'models/token';
import { TokenSelectModal } from './TokenSelectModal';

const InputsContainer = styled(Grid)({
	padding: '0 0 0 12px',
});

export interface TokenInputProps {
	tokenProps: {
		symbol: string;
		icon: React.FunctionComponent<
			React.SVGProps<SVGSVGElement> & {
				title?: string | undefined;
			}
		>;
	};
	inputProps: NumericInputProps;
	handleSelect: (token: Token) => void;
	tokens: Token[];
}

const TokenContainer = styled(Box)({
	width: '100%',
	height: '100%',
});

const TokenSymbol = styled(Grid)({
	boxSizing: 'border-box',
	paddingLeft: 12,
});

export const TokenInput: React.FC<TokenInputProps> = ({ tokenProps, inputProps, tokens, handleSelect }) => {
	const [open, setOpen] = useState(false);

	const handleClick = useCallback(() => {
		setOpen(true);
	}, []);

	return (
		<>
			<DarkBox>
				<Grid container alignItems="center">
					<Grid item xs>
						<TokenContainer onClick={handleClick}>
							<Grid container alignItems="center">
								<Grid item>
									<TokenIcon Icon={tokenProps.icon} size="large" />
								</Grid>
								<TokenSymbol item xs>
									<Typography variant="body1" color="textPrimary">
										{tokenProps.symbol}
									</Typography>
								</TokenSymbol>
							</Grid>
						</TokenContainer>
					</Grid>
					<InputsContainer item xs>
						<Grid container justify="flex-end" alignItems="center">
							<Grid item xs>
								<NumericInput {...inputProps} />
							</Grid>
						</Grid>
					</InputsContainer>
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
