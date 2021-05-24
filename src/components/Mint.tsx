import React, { useContext, useState } from 'react';
import { Button, Grid, styled } from '@material-ui/core';

import { ActionTypes, NotificationsContext } from 'context/notifications';
import { Token } from '../models/Token';
import { DarkBox } from './common/DarkBox';
import { SelectedToken, TokenSelector } from './TokenSelector';
import { NumericInput } from './NumericInput';
import { useTokens } from 'services/API/token/hooks/useTokens';
import { useTokenOptions } from '../services/API/token/hooks/useTokenOptions';
import { useMintError } from '../hooks/amounts';

const StyledInputContainer = styled(Grid)({
	padding: '0 0 0 12px',
});

const StyledContainer = styled(Grid)({
	'& > *': {
		marginBottom: '25.5px',
	},
});

const StyledAddButtonContainer = styled(Grid)({
	'& > *': {
		marginBottom: '10px',
	},
	textAlign: 'center',
});

const StyledAddTokenButton = styled(Button)(({ theme }) => ({
	fontSize: theme.spacing(2),
}));

export const Mint = (): JSX.Element => {
	const { dispatch } = useContext(NotificationsContext);
	const [mintToken1, setMintToken1] = useState<Token>();
	const [mintToken2, setMintToken2] = useState<Token>();
	const [mintAmount1, setMintAmount1] = useState<string>('1');
	const [mintAmount2, setMintAmount2] = useState<string>('1000');

	const { data: tokenOptions } = useTokens();
	const options = useTokenOptions(mintToken1, tokenOptions);
	const mint1Error = useMintError(mintToken1, mintAmount1);
	const mint2Error = useMintError(mintToken2, mintAmount2);
	const error = mint1Error || (mintToken2 && mint2Error);

	const handleAddToken = () => {
		if (!options) return;
		setMintToken2(options[0]);
	};

	const handleMint = () => {
		if (!mintToken1) return;
		dispatch({
			type: ActionTypes.OPEN_SUCCESS,
			payload: {
				title: `Success!`,
				icon: mintToken1.icon,
				text: `Received ${mintAmount1} ${mintToken1.symbol}`,
				link: '0xb7d91c4........fa84fc5e6f',
				buttonText: 'Go Back',
			},
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
			<StyledContainer item xs={12}>
				<DarkBox>
					<Grid container alignItems="center">
						<Grid item xs aria-label="token to swap">
							<MintToken1 />
						</Grid>
						{mintToken1 && (
							<StyledInputContainer item xs>
								<Grid container justify="flex-end" alignItems="center">
									<Grid item xs={6}>
										<NumericInput
											inputProps={{
												'aria-label': 'amount of token to swap',
											}}
											value={mintAmount1}
											handleChange={(change) => setMintAmount1(change)}
										/>
									</Grid>
								</Grid>
							</StyledInputContainer>
						)}
					</Grid>
				</DarkBox>
			</StyledContainer>
			{mintToken2 && (
				<StyledContainer item xs={12}>
					<DarkBox>
						<Grid container alignItems="center">
							<Grid item xs aria-label="token to swap">
								<SelectedToken token={mintToken2} />
							</Grid>
							<StyledInputContainer item xs>
								<Grid container justify="flex-end" alignItems="center">
									<Grid item xs={6}>
										<NumericInput
											inputProps={{
												'aria-label': 'amount of token to swap',
											}}
											value={mintAmount2}
											handleChange={(change) => setMintAmount2(change)}
										/>
									</Grid>
								</Grid>
							</StyledInputContainer>
						</Grid>
					</DarkBox>
				</StyledContainer>
			)}
			{mintToken1 && !mintToken2 && (
				<StyledAddButtonContainer item xs={12}>
					<StyledAddTokenButton color="secondary" onClick={handleAddToken}>
						+ Add Token
					</StyledAddTokenButton>
				</StyledAddButtonContainer>
			)}
			<Grid item xs={12}>
				<Button
					variant="contained"
					color="secondary"
					fullWidth
					disableElevation
					disabled={(!mintAmount1 && !mintAmount2) || !!error}
					onClick={handleMint}
				>
					{error ? error : 'Mint'}
				</Button>
			</Grid>
		</Grid>
	);
};
