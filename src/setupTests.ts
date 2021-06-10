import { setLogger } from 'react-query';

jest.mock('notistack', () => ({
	...jest.requireActual('notistack'),
	useSnackbar: () => {
		return {
			enqueueSnackbar: jest.fn(),
		};
	},
}));

setLogger({
	log: console.log,
	warn: console.warn,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	error: () => {},
});
