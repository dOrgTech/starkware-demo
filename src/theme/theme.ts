import { createMuiTheme } from '@material-ui/core/styles';
import hexToRgba from 'hex-to-rgba';

const defaultTheme = createMuiTheme();

export const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#FAFAF5',
		},
		secondary: {
			main: '#FB514F',
			dark: '#FE4A49',
		},
		background: {
			paper: '#28286E',
		},
		text: {
			primary: '#FAFAF5',
			secondary: hexToRgba('#FAFAF5', 0.6),
		},
		action: {
			disabled: 'rgba(250, 250, 245, 0.25)',
			disabledBackground: 'rgba(145, 145, 183, 0.15)',
		},
		info: {
			main: '#74B0FF',
		},
		success: {
			main: '#9E3B5A',
		},
		error: {
			main: '#9E3B5A',
		},
	},
	typography: {
		fontFamily: 'IBM Plex Sans',
		subtitle1: {
			fontSize: '14px',
			lineHeight: '18px',
		},
		subtitle2: {
			fontWeight: 300,
			fontSize: '10px',
			lineHeight: '13px',
		},
		body1: {
			fontStyle: 'normal',
			fontSize: '20px',
			lineHeight: '26px',
		},
		body2: {
			fontSize: '22px',
			lineHeight: '29px',
		},
		h4: {
			fontWeight: 600,
			fontSize: 24,
		},
		h5: {
			fontSize: '18px',
		},
		h6: {
			fontSize: '11px',
		},
	},
	overrides: {
		MuiCssBaseline: {
			'@global': {
				'*::-webkit-scrollbar': {
					width: 4,
				},
				'*::-webkit-scrollbar-track': {
					'-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.3)',
					borderRadius: 10,
				},
				'*::-webkit-scrollbar-thumb': {
					backgroundColor: hexToRgba('#6C76CF', 0.3),
					borderRadius: 10,
				},
			},
		},
		MuiButton: {
			root: {
				textTransform: 'unset',
			},
			outlinedSecondary: {
				fontSize: 12,
			},
			containedSecondary: {
				minHeight: 66,
				fontSize: 18,
				backgroundColor: hexToRgba('#FE4A49', 0.2),
				color: '#FB514F',
				'&:hover': {
					backgroundColor: hexToRgba('#FE4A49', 0.1),
				},
			},
		},
		MuiDialog: {
			paper: {
				position: 'absolute',
				top: 100,
				borderRadius: defaultTheme.spacing(1),
				left: 'calc(50% - 116px)',
				[defaultTheme.breakpoints.down('sm')]: {
					left: 'unset',
				},
			},
		},
	},
});
