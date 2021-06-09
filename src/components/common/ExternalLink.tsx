import React from 'react';
import ContentCopyIcon from '@material-ui/icons/FileCopyOutlined';
import { Grid, Link, styled, Tooltip, Typography } from '@material-ui/core';
import { EXPLORER_URL } from '../../constants';

const ExplorerText = styled(Typography)({
	fontSize: '14px',
});

const CopyIcon = styled(ContentCopyIcon)(({ theme }) => ({
	fontSize: '14px',
	color: theme.palette.secondary.main,
	cursor: 'pointer',
}));

const StyledContainer = styled(Grid)({
	width: 'unset',
});

interface Props {
	txId: string;
}

const StyledLinkContainer = styled(Grid)({
	marginTop: '-5px',
});

export const ExternalLink = ({ txId }: Props): JSX.Element => {
	const [isCopied, setIsCopied] = React.useState(false);

	const handleCopy = () => {
		setIsCopied(true);
		navigator.clipboard.writeText(txId);
	};

	return (
		<StyledContainer container spacing={1} justify="center" alignItems="center">
			<Grid item>
				<ExplorerText>View on Block Explorer: </ExplorerText>
			</Grid>
			<StyledLinkContainer item>
				<Link
					href={`${EXPLORER_URL}/tx/${txId}`}
					target="_blank"
					rel="noreferrer"
					variant="subtitle1"
					color="secondary"
				>
					{txId}
				</Link>
			</StyledLinkContainer>
			<Grid item>
				<Tooltip
					title={isCopied ? 'Copied!' : 'Copy'}
					arrow
					placement="top"
					leaveTouchDelay={0}
					onClose={() => {
						setTimeout(() => {
							setIsCopied(false);
						}, 500);
					}}
				>
					<CopyIcon onClick={handleCopy} />
				</Tooltip>
			</Grid>
		</StyledContainer>
	);
};
