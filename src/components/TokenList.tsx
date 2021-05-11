import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import { createStyles, ListItemSecondaryAction, makeStyles, styled, Theme, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			maxWidth: 252,
			backgroundColor: theme.palette.background.paper,
			boxShadow: '0px 5px 15px 0.4px rgba(0, 0, 0, 0.1)',
			borderRadius: '6px',
		},
	}),
);

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
	color: theme.palette.text.primary,
}));

const StyledAvatar = styled(Avatar)({
	'& > *': {
		width: '100%',
		height: '100%',
	},
});

const StyledDivider = styled('hr')({
	opacity: '0.2',
	border: '0.5px solid #C1C1FF',
});

interface Props {
	tokens: {
		Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
		symbol: string;
		amount: string;
	}[];
}

export const TokenList: React.FC<Props> = ({ tokens }) => {
	const classes = useStyles();

	return (
		<List className={classes.root}>
			{tokens.map(({ Icon, symbol, amount }, i) => (
				<>
					<ListItem key={`token-${i}`}>
						<ListItemAvatar>
							<StyledAvatar>
								<Icon />
							</StyledAvatar>
						</ListItemAvatar>
						<StyledListItemText primary={symbol} />
						<ListItemSecondaryAction>
							<Typography color="textPrimary" variant="body1">
								{amount}
							</Typography>
						</ListItemSecondaryAction>
					</ListItem>
					{i === tokens.length - 1 ? null : <StyledDivider />}
				</>
			))}
		</List>
	);
};
