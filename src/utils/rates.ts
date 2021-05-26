import { ConversionRate } from 'models/token';

export const getConversionRate = (from: string, to: string): ConversionRate => ({
	from: Number(to) / Number(from),
	to: Number(from) / Number(to),
});
