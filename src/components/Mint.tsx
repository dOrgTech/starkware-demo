import React, { useContext, useState } from 'react';
import { DarkBox } from './common/DarkBox';
import { SelectedToken } from './TokenSelector';

import { Button, Grid, styled } from '@material-ui/core';
import { NumericInput } from './NumericInput';
import { useTokens } from 'services/API/token/hooks/useTokens';
import { ActionTypes, NotificationsContext } from 'context/notifications';

const StyledInputContainer = styled(Grid)({
	padding: '0 0 0 12px',
});

const StyledContainer = styled(Grid)({
	'& > *': {
		marginBottom: '30px',
	},
});

const getMintFormError = (amount1?: string, amount2?: string): string | undefined => {
	if (Number(amount1) > 1000 || Number(amount2) > 1000) {
		return 'Cannot mint more than 1000';
	}
};

export const Mint = (): JSX.Element => {
	const [mintAmount1, setMintAmount1] = useState<string>('1');
	const [mintAmount2, setMintAmount2] = useState<string>('1000');
	const { dispatch } = useContext(NotificationsContext);
	const { data } = useTokens();

	const error = getMintFormError(mintAmount1, mintAmount2);

	return (
		<Grid container>
			<Grid item>
				<StyledContainer container direction="column" justify="space-between">
					{data && (
						<>
							<Grid item>
								<DarkBox>
									<Grid container alignItems="center">
										<Grid item xs>
											<SelectedToken token={data[0]} />
										</Grid>
										<StyledInputContainer item xs>
											<Grid container justify="flex-end" alignItems="center">
												<NumericInput
													inputProps={{
														'aria-label': 'mint amount 1',
													}}
													value={mintAmount1}
													handleChange={(change) => setMintAmount1(change)}
												/>
											</Grid>
										</StyledInputContainer>
									</Grid>
								</DarkBox>
							</Grid>
							<Grid item>
								<DarkBox>
									<Grid container alignItems="center">
										<Grid item xs>
											<SelectedToken token={data[1]} />
										</Grid>
										<StyledInputContainer item xs>
											<Grid container justify="flex-end" alignItems="center">
												<NumericInput
													inputProps={{
														'aria-label': 'mint amount 2',
													}}
													value={mintAmount2}
													handleChange={(change) => {
														setMintAmount2(change);
													}}
												/>
											</Grid>
										</StyledInputContainer>
									</Grid>
								</DarkBox>
							</Grid>
						</>
					)}
				</StyledContainer>
			</Grid>
			<Grid item xs={12}>
				<Button
					variant="contained"
					color="secondary"
					fullWidth
					disableElevation
					disabled={(!mintAmount1 && !mintAmount2) || !!error}
					onClick={() => {
						dispatch({
							type: ActionTypes.OPEN_SUCCESS,
							payload: {
								title: `Success!`,
								icon: data?.[0].icon || '',
								text: `Received ${mintAmount1} ${data?.[0].symbol}`,
								link: '0xb7d91c4........fa84fc5e6f',
								buttonText: 'Go Back',
							},
						});
					}}
				>
					{error ? error : 'Mint'}
				</Button>
			</Grid>
		</Grid>
	);
};
