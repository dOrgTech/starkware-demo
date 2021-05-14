import React from 'react';
import {
	Box,
	createStyles,
	Dialog,
	DialogProps,
	List,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	ListItemText,
	makeStyles,
	styled,
	Typography,
} from '@material-ui/core';
import { Token } from 'models/token';
import { TokenIcon } from './common/TokenIcon';

const useStyles = makeStyles((theme) =>
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

const StyledModalContainer = styled(Box)(({ theme }) => ({
	position: 'fixed',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	maxWidth: '100%',
	maxHeight: '100%',
	width: 252,
	height: 241,
	overflowY: 'auto',
	background: theme.palette.background.paper,
	border: '1.5px solid rgba(83, 83, 135, 0.3)',
	boxSizing: 'border-box',
	boxShadow: '0px 8px 15px 3px rgba(7, 7, 7, 0.1)',
	borderRadius: '8px',
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
	color: theme.palette.text.primary,
}));

const StyledDivider = styled('hr')({
	opacity: '0.2',
	border: '0.5px solid #C1C1FF',
});

interface Props extends DialogProps {
	tokens: Token[];
	handleSelect: (token: Token) => void;
}

export const TokenSelectModal: React.FC<Props> = ({ tokens, handleSelect, ...props }) => {
	const classes = useStyles();

	return (
		<Dialog {...props}>
			<StyledModalContainer>
				<List className={classes.root}>
					{tokens.map((token, i) => (
						<>
							<ListItem key={`token-${i}`} button onClick={() => handleSelect(token)}>
								<ListItemAvatar>
									<TokenIcon Icon={token.icon} size="default" />
								</ListItemAvatar>
								<StyledListItemText primary={token.symbol} />
								<ListItemSecondaryAction>
									<Typography color="textPrimary" variant="body1">
										{token.price}
									</Typography>
								</ListItemSecondaryAction>
							</ListItem>
							{i === tokens.length - 1 ? null : <StyledDivider />}
						</>
					))}
				</List>
			</StyledModalContainer>
		</Dialog>
	);
};
