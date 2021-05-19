import { ConversionRate } from 'models/Token';

export const getConversionRate = (from: string, to: string): ConversionRate => ({
	from: Number(to) / Number(from),
	to: Number(from) / Number(to),
});
