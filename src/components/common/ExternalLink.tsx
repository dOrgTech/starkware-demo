import React from 'react';
import CallMadeIcon from '@material-ui/icons/CallMade';
import ContentCopyIcon from '@material-ui/icons/FileCopyOutlined';
import { Grid, Link, LinkProps, styled } from '@material-ui/core';

const ArrowIcon = styled(CallMadeIcon)({
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

export const ExternalLink: React.FC<LinkProps> = ({ children, href, ...props }) => {
	const handleCopy = () => {
		navigator.clipboard.writeText(href || '');
	};

	return (
		<StyledContainer container spacing={1} justify="center">
			<Grid item>
				<Link href={href} {...props}>
					{children}
				</Link>
			</Grid>
			<Grid item>
				<CopyIcon onClick={handleCopy} />
			</Grid>
			<Grid item>
				<Link href={href} {...props}>
					<ArrowIcon />
				</Link>
			</Grid>
		</StyledContainer>
	);
};
