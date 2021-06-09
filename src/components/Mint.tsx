import React, { useContext, useState } from 'react';
import { Box, Button, Grid, styled } from '@material-ui/core';

import { Token } from '../models/token';
import { DarkBox } from './common/DarkBox';
import { SelectedToken, TokenSelector } from './TokenSelector';
import { NumericInput } from './NumericInput';
import { useMintError } from '../hooks/amounts';
import { BouncingDots } from './common/BouncingDots';
import { useFilteredTokens } from '../hooks/tokens';
import { useMint } from 'services/API/mutations/useMint';
import { UserContext } from '../context/user';

const StyledInputContainer = styled(Grid)(({ theme }) => ({
	[theme.breakpoints.up('sm')]: {
		paddingLeft: 12,
	},
}));

const StyledMint2Container = styled(Grid)({
	marginTop: 16,
});

const StyledAddButtonContainer = styled(Grid)({
	textAlign: 'center',
	marginTop: 18,
});

const StyledAddTokenButton = styled(Button)(({ theme }) => ({
	fontSize: theme.spacing(2),
}));

export const Mint = (): JSX.Element => {
	const {
		state: { activeTransaction },
	} = useContext(UserContext);
	const { mutate, isLoading } = useMint();

	const [mintToken1, setMintToken1] = useState<Token>();
	const [mintToken2, setMintToken2] = useState<Token>();
	const [mintAmount1, setMintAmount1] = useState<string>('1000');
	const [mintAmount2, setMintAmount2] = useState<string>('1000');

	const options = useFilteredTokens(mintToken1);
	const mint1Error = useMintError(mintToken1, mintAmount1);
	const mint2Error = useMintError(mintToken2, mintAmount2);
	const error = mint1Error || (mintToken2 && mint2Error);
	const actionButtonText = error || 'Mint';

	const handleAddToken = () => {
		if (!options) return;
		setMintToken2(options[0]);
	};

	const handleMint = () => {
		if (!mintToken1) return;
		mutate({
			mint1: {
				token: mintToken1,
				amount: mintAmount1,
			},
			mint2: mintToken2
				? {
						token: mintToken2,
						amount: mintAmount2,
				  }
				: undefined,
		});
	};

	const MintToken1 = () => {
		if (mintToken1 && mintToken2) {
			return <SelectedToken token={mintToken1} />;
		}

		return (
			<TokenSelector
				value={mintToken1}
				options={options}
				onChange={(token) => setMintToken1(token)}
			/>
		);
	};

	return (
		<Grid container>
			<Grid item xs={12}>
				<DarkBox>
					<Grid container alignItems="center">
						<Grid item xs aria-label="token to swap">
							<MintToken1 />
						</Grid>
						{mintToken1 && (
							<StyledInputContainer container item xs={4} sm={6} alignItems="center">
								<Grid item xs>
									<NumericInput
										inputProps={{
											'aria-label': 'amount of token to swap',
										}}
										value={mintAmount1}
										handleChange={(change) => setMintAmount1(change)}
									/>
								</Grid>
							</StyledInputContainer>
						)}
					</Grid>
				</DarkBox>
			</Grid>
			{mintToken1 && !mintToken2 && (
				<StyledAddButtonContainer item xs={12}>
					<StyledAddTokenButton color="secondary" onClick={handleAddToken}>
						+ Add Token
					</StyledAddTokenButton>
				</StyledAddButtonContainer>
			)}
			{mintToken2 && (
				<StyledMint2Container item xs={12}>
					<DarkBox>
						<Grid container alignItems="center">
							<Grid item xs aria-label="token to swap">
								<SelectedToken token={mintToken2} />
							</Grid>
							<StyledInputContainer container item xs={4} sm={6} alignItems="center">
								<Grid item>
									<NumericInput
										inputProps={{
											'aria-label': 'amount of token to swap',
										}}
										value={mintAmount2}
										handleChange={(change) => setMintAmount2(change)}
									/>
								</Grid>
							</StyledInputContainer>
						</Grid>
					</DarkBox>
				</StyledMint2Container>
			)}
			<Grid item xs={12}>
				<Box clone marginTop={mintToken1 && !mintToken2 ? '18px' : '32px'}>
					<Button
						variant="contained"
						color="secondary"
						fullWidth
						disableElevation
						disabled={
							(!mintAmount1 && !mintAmount2) || !!error || !!activeTransaction || !!isLoading
						}
						onClick={handleMint}
					>
						{activeTransaction || isLoading ? <BouncingDots /> : actionButtonText}
					</Button>
				</Box>
			</Grid>
		</Grid>
	);
};
