import React from 'react';
import {
	DialogProps,
	Theme,
	styled,
	makeStyles,
	Dialog,
	ListItemAvatar,
	ListItemText,
	DialogTitle,
	DialogContent,
	List,
	ListItem,
	Typography,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { TokenIcon } from './common/TokenIcon';
import { Token } from 'models/Token';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: '100%',
		padding: 0,
	},
	dialog: {
		position: 'absolute',
		top: 100,
		borderRadius: theme.spacing(1),
	},
	scrollPaper: {
		alignItems: 'baseline',
	},
	gutters: {
		paddingRight: 33,
		paddingLeft: 33,
	},
	dialogTitle: {
		padding: '30px 33px 0px 33px',
	},
	dialogContent: {
		padding: '14px 0px 25px 0px',
	},
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
	color: theme.palette.text.primary,
}));

const StyledDialogTitle = styled(Typography)({
	fontWeight: 600,
	fontSize: 20,
});

const StyledCloseButton = styled(IconButton)(({ theme }) => ({
	position: 'absolute',
	right: theme.spacing(3),
	top: theme.spacing(4),
	color: theme.palette.grey[500],
	padding: theme.spacing(1),
}));

interface Props extends DialogProps {
	tokens: Token[];
	handleSelect: (token: Token) => void;
	onClose: () => void;
}

export const TokenSelectDialog = ({
	tokens,
	onClose,
	handleSelect,
	...props
}: Props): JSX.Element => {
	const classes = useStyles();

	return (
		<Dialog
			{...props}
			classes={{
				paper: classes.dialog,
				scrollPaper: classes.scrollPaper,
			}}
			fullWidth
			maxWidth="xs"
		>
			<DialogTitle disableTypography className={classes.dialogTitle}>
				<StyledDialogTitle variant="h6">Select a token</StyledDialogTitle>
				<StyledCloseButton aria-label="close" onClick={onClose}>
					<CloseIcon />
				</StyledCloseButton>
			</DialogTitle>
			<DialogContent className={classes.dialogContent}>
				<List className={classes.root}>
					{tokens.map((token, index) => (
						<React.Fragment key={`token-${token.symbol}-${index}`}>
							<ListItem
								button
								onClick={() => handleSelect(token)}
								classes={{ gutters: classes.gutters }}
							>
								<ListItemAvatar>
									<TokenIcon icon={token.icon} size="default" />
								</ListItemAvatar>
								<StyledListItemText primary={token.symbol} />
								<Typography color="textPrimary" variant="body1">
									{token.price}
								</Typography>
							</ListItem>
						</React.Fragment>
					))}
				</List>
			</DialogContent>
		</Dialog>
	);
};
