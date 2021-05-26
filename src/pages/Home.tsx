import React, { useState, useCallback, useMemo } from 'react';
import { styled, Container, Box, Tabs, createStyles, makeStyles, Tab } from '@material-ui/core';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { Mint } from 'components/Mint';
import { Swap } from 'components/Swap';
import { Activity } from 'components/Activity';

const CardContainer = styled(Box)({
	margin: 'auto',
	width: '100%',
	maxWidth: '440px',
	padding: '26px 33px 31px 33px',
	marginTop: 76,
	background: '#28286E',
	border: '1.5px solid rgba(83, 83, 135, 0.3)',
	boxSizing: 'border-box',
	boxShadow: '0px 8px 15px 3px rgba(7, 7, 7, 0.13)',
	borderRadius: '8px',
});

const CardContent = styled(Box)({
	paddingTop: 22,
	boxSizing: 'border-box',
});

const useTabsStyles = makeStyles((theme) =>
	createStyles({
		root: {
			minHeight: 'unset',
		},
		indicator: {
			display: 'flex',
			backgroundColor: 'transparent',
			'& > span': {
				width: '75%',
				margin: '0 auto 0 0',
				height: 1.5,
				backgroundColor: theme.palette.secondary.main,
			},
		},
	}),
);

const useTabStyles = makeStyles(() =>
	createStyles({
		root: {
			minHeight: 'unset',
			fontSize: 20,
			textTransform: 'none',
			color: 'white',
			padding: '0 0 5px 0',
			'&:focus': {
				opacity: 1,
			},
			minWidth: 80,
		},
		wrapper: {
			flexDirection: 'row',
			justifyContent: 'start',
		},
	}),
);

const TABS = [
	{
		label: 'Mint',
		value: 'mint',
	},
	{
		label: 'Swap',
		value: 'swap',
	},
	{
		label: 'Activity',
		value: 'activity',
	},
];

export const Home = (): JSX.Element => {
	const tabsStyles = useTabsStyles();
	const tabStyles = useTabStyles();
	const location = useLocation();
	const initialTab = useMemo(() => location.pathname.split('/').slice(-1)[0] || 'swap', [location]);

	const [selectedTab, setSelectedTab] = useState(initialTab);
	const history = useHistory();

	const handleTabSelected = useCallback(
		(_: unknown, tab: string) => {
			setSelectedTab(tab);
			history.push(tab);
		},
		[history],
	);

	return (
		<Container maxWidth="lg">
			<CardContainer>
				<Tabs
					TabIndicatorProps={{ children: <span /> }}
					classes={tabsStyles}
					value={selectedTab}
					onChange={handleTabSelected}
				>
					{TABS.map(({ label, value }, i) => (
						<Tab key={`tab-${i}`} disableRipple classes={tabStyles} label={label} value={value} />
					))}
				</Tabs>
				<CardContent>
					<Switch>
						<Route path="/mint">
							<Mint />
						</Route>
						<Route path="/swap">
							<Swap />
						</Route>
						<Route path="/activity">
							<Activity />
						</Route>
						<Redirect to="/swap" />
					</Switch>
				</CardContent>
			</CardContainer>
		</Container>
	);
};
