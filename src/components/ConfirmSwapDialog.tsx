import React from 'react';
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

import { ConversionRate, Token } from 'models/token';
import { ReactComponent as CloseIcon } from '../assets/icons/close.svg';
import { ReactComponent as ArrowDownIcon } from '../assets/icons/arrow-down.svg';
import { ReactComponent as SwapIcon } from '../assets/icons/swap.svg';
import { TokenIcon } from './common/TokenIcon';
import { SwapReceipt } from '../models/swap';

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

type SwapCandidate = Pick<Token, 'symbol' | 'icon'> & {
	amount: string;
};

interface Props extends DialogProps {
	from?: SwapCandidate;
	to?: SwapCandidate;
	conversionRate: ConversionRate;
	onClose: () => void;
	onSwap: (receipt: SwapReceipt) => void;
}

export const ConfirmSwapDialog = ({ open, from, to, onClose, onSwap }: Props) => {
	const classes = useStyles();

	return (
		<Dialog
			classes={{
				paper: classes.dialog,
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
									<TokenIcon icon={from.icon} />
								</Grid>
								<Grid item className={classes.amount}>
									<Typography variant="body1" color="textPrimary">
										{from.amount}
									</Typography>
								</Grid>
							</Grid>
							<Grid item xs>
								<StyledEndAlignText variant="body1" color="textPrimary">
									{from.symbol}
								</StyledEndAlignText>
							</Grid>
						</StyledRow>
						<StyledRow item container>
							<StyledArrowIcon />
						</StyledRow>
						<StyledRow item container>
							<Grid item container alignItems="center" xs>
								<Grid item>
									<TokenIcon icon={to.icon} />
								</Grid>
								<Grid item className={classes.amount}>
									<Typography variant="body1" color="textPrimary">
										{to.amount}
									</Typography>
								</Grid>
							</Grid>
							<Grid item xs>
								<StyledEndAlignText variant="body1" color="textPrimary">
									{to.symbol}
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
										{`${to.amount} ${to.symbol} / ${from.symbol}`}
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
								onClick={() => {
									if (!to) return;
									const { amount, ...token } = to;
									onSwap({ id: '123', token, amount });
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
