import React, { useState } from 'react';
import { DarkBox } from './common/DarkBox';
import { TokenSelector } from './TokenSelector';

import { Grid, styled } from '@material-ui/core';
import { NumericInput } from './NumericInput';
import { useTokens } from 'services/API/token/hooks/useTokens';
import { Token } from 'models/Token';
import { useTokenOptions } from 'services/API/token/hooks/useTokenOptions';

const StyledInputContainer = styled(Grid)({
	padding: '0 0 0 12px',
});

export const Mint = (): JSX.Element => {
	const [token, setToken] = useState<Token>();
	const [mintAmount, setMintAmount] = useState<string>();
	const { data } = useTokens();

	const options = useTokenOptions(token, data);

	return (
		<DarkBox>
			<Grid container alignItems="center">
				<Grid item xs>
					<TokenSelector value={token} options={options} onChange={(token) => setToken(token)} />
				</Grid>
				{token && (
					<StyledInputContainer item xs>
						<Grid container justify="flex-end" alignItems="center">
							<NumericInput
								inputProps={{
									'aria-label': 'mint amount',
								}}
								value={mintAmount}
								handleChange={(change) => setMintAmount(change)}
							/>
						</Grid>
					</StyledInputContainer>
				)}
			</Grid>
		</DarkBox>
	);
};
