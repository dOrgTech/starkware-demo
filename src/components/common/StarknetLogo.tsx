import React from 'react';
import Starknet from 'assets/starknet.svg';
import { Box, styled, Typography } from '@material-ui/core';

const Subtitle = styled(Typography)({
	display: 'block',
	boxSizing: 'border-box',
	textAlign: 'end',
	marginTop: '-10px',
	paddingRight: '9px',
});

const Container = styled(Box)({
	width: 196,
	height: 56,
});

const StarkNetLogo = styled('img')({
	width: 196,
	height: 39,
	margin: 'auto',
});

export const StarknetLogo: React.FC = () => {
	return (
		<Container>
			<StarkNetLogo src={Starknet} />
			<Subtitle variant="h6">Live on Testnet</Subtitle>
		</Container>
	);
};
