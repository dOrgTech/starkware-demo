import React from 'react';
import { Card, Tabs, Tab, createStyles, Theme, withStyles, CardContent, styled, Grid } from '@material-ui/core';
import { Liquidity } from './Liquidity';
import { Swap } from './Swap';
import { Mint } from './Mint';
import CogIcon from '../assets/icons/cog.svg';

type Mode = 'mint' | 'swap' | 'liquidity';

interface StyledTabProps {
	label: string;
	value: Mode;
}

interface StyledTabsProps {
	value: Mode;
	onChange: (event: React.ChangeEvent<unknown>, mode: Mode) => void;
}

const StyledTabs = withStyles((theme) => ({
	indicator: {
		display: 'flex',
		backgroundColor: 'transparent',
		'& > span': {
			width: '50%',
			backgroundColor: theme.palette.secondary.main,
		},
	},
}))((props: StyledTabsProps) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme: Theme) =>
	createStyles({
		root: {
			height: 20,
			fontSize: 20,
			textTransform: 'none',
			color: 'white',
			marginRight: theme.spacing(1),
			padding: 0,
			'&:focus': {
				opacity: 1,
			},
			[theme.breakpoints.up('lg')]: {
				minWidth: 80,
			},
			[theme.breakpoints.down('lg')]: {
				minWidth: 60,
			},
		},
		wrapper: {
			flexDirection: 'row',
			justifyContent: 'start',
		},
	}),
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

const StyledCard = styled(Card)({
	borderRadius: 8,
	border: '1.5px solid rgba(83, 83, 135, 0.3)',
	padding: '12px 31px 33px',
	boxShadow: '0px 8px 15px 3px rgba(7, 7, 7, 0.13)',
});

const StyledCardContent = styled(CardContent)(({ theme }) => ({
	padding: theme.spacing(3, 0),
}));

export const ModeSelector = () => {
	const [mode, setMode] = React.useState<Mode>('mint');

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
		<StyledCard>
			<StyledTabs value={mode} onChange={handleModeChange}>
				<StyledTab label="Mint" value={'mint'} />
				<StyledTab label="Swap" value={'swap'} />
				<StyledTab label="Liquidity" value={'liquidity'} />
				{mode === 'swap' && (
					<Grid container justify="flex-end" xs={12} sm>
						<img src={CogIcon} alt="config-icon" />
					</Grid>
				)}
			</StyledTabs>
			<StyledCardContent>
				<Content />
			</StyledCardContent>
		</StyledCard>
	);
};
