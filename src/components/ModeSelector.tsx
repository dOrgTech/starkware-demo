import React from 'react';
import { Card, Tabs, Tab, makeStyles } from '@material-ui/core';
import { Liquidity } from './Liquidity';
import { Swap } from './Swap';
import { Mint } from './Mint';

type Mode = 'mint' | 'swap' | 'liquidity';

const useStyles = makeStyles(() => ({
	card: {
		borderRadius: 8,
		padding: '31px 33px',
	},
}));

export const ModeSelector = () => {
	const [mode, setMode] = React.useState<Mode>('mint');
	const classes = useStyles();

	const handleModeChange = (_: React.ChangeEvent<unknown>, mode: Mode) => {
		setMode(mode);
	};

	const Content = () => {
		switch (mode) {
			case 'liquidity':
				return <Liquidity />;
			case 'swap':
				return <Swap />;
			case 'mint':
			default:
				return <Mint />;
		}
	};

	return (
		<Card className={classes.card}>
			<Tabs
				value={mode}
				onChange={handleModeChange}
				indicatorColor="primary"
				textColor="primary"
				variant="fullWidth"
			>
				<Tab label="Mint" value={'mint'} />
				<Tab label="Swap" value={'swap'} />
				<Tab label="Liquidity" value={'liquidity'} />
			</Tabs>
			<Content />
		</Card>
	);
};
