import { ConversionRate } from 'models/token';
import BigNumber from 'bignumber.js';

export const getConversionRate = (from: string, to: string): ConversionRate => ({
	from: new BigNumber(to).dividedBy(from),
	to: new BigNumber(from).dividedBy(to),
});
