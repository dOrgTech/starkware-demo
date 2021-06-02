import BigNumber from 'bignumber.js';

export function randomUserId(): string {
	const max = new BigNumber(2).exponentiatedBy(256);
	return BigNumber.random().multipliedBy(max).toFixed(0, BigNumber.ROUND_FLOOR);
}
