import React, { useCallback, useContext } from 'react';
import { Box, Button, Dialog, Grid, makeStyles, styled, Typography } from '@material-ui/core';
import { ActionTypes, NotificationsContext } from 'context/notifications';
import { TokenIcon } from './common/TokenIcon';
import { ExternalLink } from './common/ExternalLink';

const StyledContainer = styled(Box)({
	maxWidth: '100%',
	width: 434,
	minHeight: 359,
	maxHeight: '100%',
	'& > *': {
		height: '100%',
	},
	padding: 32,
	boxSizing: 'border-box',
});

const StyledIconContainer = styled(Box)({
	width: '100%',

	'& > *': {
		margin: 'auto',
	},
});

const StyledTitle = styled(Typography)({
	textAlign: 'center',
	padding: '0 32px 32px 32px',
});

const StyledText = styled(Typography)({
	textAlign: 'center',
	padding: 22,
});

const StyledLinkContainer = styled(Grid)({
	margin: 'auto',
	textAlign: 'center',
	marginBottom: 35,
	display: 'block',
});

const useStyles = makeStyles({
	dialog: {
		top: 100,
	},
	scrollPaper: {
		alignItems: 'baseline',
	},
});

export const MultiTokenSuccessDialog: React.FC = () => {
	const {
		state: { multiTokenSuccess },
		dispatch,
	} = useContext(NotificationsContext);
	const classes = useStyles();

	const handleClose = useCallback(() => {
		dispatch({
			type: ActionTypes.CLOSE_MULTI_TOKEN_SUCCESS,
		});
	}, [dispatch]);

	return (
		<Dialog
			open={multiTokenSuccess.open}
			onClose={handleClose}
			classes={{
				paper: classes.dialog,
				scrollPaper: classes.scrollPaper,
			}}
		>
			<StyledContainer>
				<Grid container justify="space-between" direction="column">
					<Grid item>
						<StyledTitle variant="h4" color="textPrimary">
							{multiTokenSuccess.title}
						</StyledTitle>
						<Grid container justify="center" spacing={1}>
							{multiTokenSuccess.icons.map((icon, i) => (
								<Grid item key={`icon-${i}`}>
									<StyledIconContainer>
										<TokenIcon icon={icon} size="large" />
									</StyledIconContainer>
								</Grid>
							))}
						</Grid>

						<StyledText variant="body2" color="textPrimary">
							{multiTokenSuccess.text}
						</StyledText>
						<StyledLinkContainer container direction="column" alignItems="center" spacing={1}>
							{multiTokenSuccess.links.map((link, i) => (
								<Grid item key={`link-${i}`} container justify="center">
									<Grid item>
										<ExternalLink
											variant="subtitle1"
											color="secondary"
											href="https://etherscan.io/"
											target="_blank"
											rel="noreferrer"
										>
											{link}
										</ExternalLink>
									</Grid>
								</Grid>
							))}
						</StyledLinkContainer>
					</Grid>
					<Grid item>
						<Button
							variant="contained"
							color="secondary"
							fullWidth
							disableElevation
							onClick={handleClose}
						>
							{multiTokenSuccess.buttonText}
						</Button>
					</Grid>
				</Grid>
			</StyledContainer>
		</Dialog>
	);
};
