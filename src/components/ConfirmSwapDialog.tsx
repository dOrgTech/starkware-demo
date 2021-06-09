import React, { useEffect, useState } from 'react';
import {
	Button,
	Dialog,
	DialogContent,
	DialogProps,
	DialogTitle,
	Grid,
	makeStyles,
	styled,
	Theme,
	Typography,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

import { ReactComponent as CloseIcon } from '../assets/icons/close.svg';
import { ReactComponent as ArrowDownIcon } from '../assets/icons/arrow-down.svg';
import { ReactComponent as SwapIcon } from '../assets/icons/swap.svg';
import { TokenIcon } from './common/TokenIcon';
import { SwapInformation, SwapReceipt } from '../models/swap';
import BigNumber from 'bignumber.js';

const StyledCloseButton = styled(IconButton)(({ theme }) => ({
	position: 'absolute',
	right: theme.spacing(3),
	top: theme.spacing(4),
	color: theme.palette.grey[500],
	padding: theme.spacing(1),
}));

const StyledDialogTitle = styled(Typography)({
	fontWeight: 600,
	fontSize: 20,
});

const StyledSummaryText = styled(Typography)({
	fontSize: 16,
});

const StyledPrice = styled(StyledSummaryText)({
	opacity: 0.6,
});

const StyledArrowIcon = styled(ArrowDownIcon)({
	paddingLeft: 9,
});

const StyledEndAlignText = styled(Typography)({
	textAlign: 'end',
});

const StyledRow = styled(Grid)({
	marginBottom: 22,
});

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: '100%',
		padding: 0,
	},
	scrollPaper: {
		alignItems: 'baseline',
	},
	gutters: {
		paddingRight: 33,
		paddingLeft: 33,
	},

	dialogTitle: {
		padding: '30px 33px 35px 33px',
	},
	dialogContent: {
		padding: '0px 33px 33px 33px',
	},
	amount: {
		marginLeft: 13,
		textAlign: 'center',
	},
	rateSummary: {
		justifyContent: 'flex-end',
		[theme.breakpoints.only('xs')]: {
			justifyContent: 'start',
		},
	},
}));

interface Props extends DialogProps {
	from?: SwapInformation;
	to?: SwapInformation;
	onClose: () => void;
	onSwap: (receipt: SwapReceipt) => void;
}

export const ConfirmSwapDialog = ({ open, from, to, onClose, onSwap }: Props) => {
	const classes = useStyles();
	const [sent, isSent] = useState(false);

	useEffect(() => {
		if (!open) {
			isSent(false);
		}
	}, [open]);

	return (
		<Dialog
			classes={{
				scrollPaper: classes.scrollPaper,
			}}
			fullWidth
			maxWidth="xs"
			open={open}
		>
			<DialogTitle disableTypography className={classes.dialogTitle}>
				<StyledDialogTitle variant="h6">Confirm Swap</StyledDialogTitle>
				<StyledCloseButton aria-label="close" onClick={onClose}>
					<CloseIcon />
				</StyledCloseButton>
			</DialogTitle>
			<DialogContent className={classes.dialogContent}>
				{from && to && (
					<Grid container>
						<StyledRow item container>
							<Grid item container alignItems="center" xs>
								<Grid item>
									<TokenIcon icon={from.token.icon} />
								</Grid>
								<Grid item className={classes.amount}>
									<Typography variant="body1" color="textPrimary">
										{Number(new BigNumber(from.amount).toFixed(6))}
									</Typography>
								</Grid>
							</Grid>
							<Grid item xs>
								<StyledEndAlignText variant="body1" color="textPrimary">
									{from.token.symbol}
								</StyledEndAlignText>
							</Grid>
						</StyledRow>
						<StyledRow item container>
							<StyledArrowIcon />
						</StyledRow>
						<StyledRow item container>
							<Grid item container alignItems="center" xs>
								<Grid item>
									<TokenIcon icon={to.token.icon} />
								</Grid>
								<Grid item className={classes.amount}>
									<Typography variant="body1" color="textPrimary">
										{Number(new BigNumber(to.amount).toFixed(6))}
									</Typography>
								</Grid>
							</Grid>
							<Grid item xs>
								<StyledEndAlignText variant="body1" color="textPrimary">
									{to.token.symbol}
								</StyledEndAlignText>
							</Grid>
						</StyledRow>
						<StyledRow item container>
							<Grid item container alignItems="center" xs={12} sm>
								<StyledPrice variant="body1" color="textPrimary">
									Price
								</StyledPrice>
							</Grid>
							<Grid
								item
								container
								xs={12}
								sm
								spacing={1}
								className={classes.rateSummary}
								alignItems="center"
							>
								<Grid item>
									<StyledSummaryText variant="body1" color="textPrimary">
										{`${Number(new BigNumber(to.amount).toFixed(6))} ${to.token.symbol} / ${
											from.token.symbol
										}`}
									</StyledSummaryText>
								</Grid>
								<Grid item>
									<SwapIcon width={13} height={11} />
								</Grid>
							</Grid>
						</StyledRow>
						<Grid item xs>
							<Button
								variant="contained"
								color="secondary"
								fullWidth
								disableElevation
								disabled={sent}
								onClick={() => {
									if (!to) return;
									isSent(true);
									onSwap({ from, to });
								}}
							>
								Confirm Swap
							</Button>
						</Grid>
					</Grid>
				)}
			</DialogContent>
		</Dialog>
	);
};
