import React from 'react';
import { DarkBox } from './common/DarkBox';
import { TokenSelector } from './TokenSelector';
import { TOKENS } from './Swap';

export const Mint = (): JSX.Element => {
	return (
		<DarkBox>
			<TokenSelector
				onChange={(e) => {
					console.log(e);
				}}
				options={TOKENS}
			/>
		</DarkBox>
	);
};
