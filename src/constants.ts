import TokenSVG from './assets/tokens/token.svg';
import Token2SVG from './assets/tokens/token2.svg';

export const tokens = [
	{
		id: '1',
		name: 'Token 1',
		symbol: 'TK1',
		icon: TokenSVG,
		price: '1',
		color: '#FE9493',
	},
	{
		id: '2',
		name: 'Token 2',
		symbol: 'TK2',
		icon: Token2SVG,
		price: '0.8',
		color: '#48C8FF',
	},
];

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL as string;

if (!API_BASE_URL) {
	throw new Error(`Missing API_BASE_URL env var`);
}

const EXPLORER_URL = process.env.REACT_APP_EXPLORER_URL as string;

if (!EXPLORER_URL) {
	throw new Error(`Missing EXPLORER_URL env var`);
}

const GET_ACCOUNT_TOKEN_BALANCE_ENTRYPOINT = process.env
	.REACT_APP_GET_ACCOUNT_TOKEN_BALANCE_ENTRYPOINT as string;

if (!GET_ACCOUNT_TOKEN_BALANCE_ENTRYPOINT) {
	throw new Error(`Missing GET_ACCOUNT_TOKEN_BALANCE_ENTRYPOINT env var`);
}

const GET_POOL_TOKEN_BALANCE_ENTRYPOINT = process.env
	.REACT_APP_GET_POOL_TOKEN_BALANCE_ENTRYPOINT as string;

if (!GET_POOL_TOKEN_BALANCE_ENTRYPOINT) {
	throw new Error(`Missing GET_POOL_TOKEN_BALANCE_ENTRYPOINT env var`);
}
const ADD_DEMO_TOKEN_ENTRYPOINT = process.env.REACT_APP_ADD_DEMO_TOKEN_ENTRYPOINT as string;

if (!ADD_DEMO_TOKEN_ENTRYPOINT) {
	throw new Error(`Missing ADD_DEMO_TOKEN_ENTRYPOINT env var`);
}
const SWAP_ENTRYPOINT = process.env.REACT_APP_SWAP_ENTRYPOINT as string;

if (!SWAP_ENTRYPOINT) {
	throw new Error(`Missing SWAP_ENTRYPOINT env var`);
}
const INIT_POOL_ENTRYPOINT = process.env.REACT_APP_INIT_POOL_ENTRYPOINT as string;

if (!INIT_POOL_ENTRYPOINT) {
	throw new Error(`Missing INIT_POOL_ENTRYPOINT env var`);
}
const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS as string;

if (!CONTRACT_ADDRESS) {
	throw new Error(`Missing CONTRACT_ADDRESS env var`);
}

export {
	GET_ACCOUNT_TOKEN_BALANCE_ENTRYPOINT,
	GET_POOL_TOKEN_BALANCE_ENTRYPOINT,
	ADD_DEMO_TOKEN_ENTRYPOINT,
	SWAP_ENTRYPOINT,
	INIT_POOL_ENTRYPOINT,
	CONTRACT_ADDRESS,
	EXPLORER_URL,
	API_BASE_URL,
};
