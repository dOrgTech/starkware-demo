import BigNumber from 'bignumber.js';

/*
	Calculates the receiving swap value using the following formula:
	amount_to = (amm_to_balance * amount_from) / (amm_from_balance + amount_from)
 */
export const calculateSwapValue = (
	poolFromBalance: string,
	poolToBalance: string,
	inputAmount: string,
): BigNumber => {
	const ammFrom = new BigNumber(poolToBalance).multipliedBy(inputAmount);
	const ammTo = new BigNumber(poolFromBalance).plus(inputAmount);

	return ammFrom.dividedBy(ammTo);
};
