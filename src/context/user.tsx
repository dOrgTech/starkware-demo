import React, { createContext, Dispatch, useReducer } from 'react';
import { produce } from 'immer';
import { MintArgs } from 'services/API/mutations/useMint';
import { SwapArgs } from 'services/API/mutations/useSwap';
import { randomUserId } from '../utils/random';

const getUserId = (): string => {
	const storedUserId = localStorage.getItem('userId');

	if (storedUserId) {
		return storedUserId;
	}

	const userId = randomUserId();
	localStorage.setItem('userId', userId);
	return userId;
};

type Token = {
	symbol: string;
	name: string;
	address: string;
};

type Asset = {
	id: string;
	token: Token;
	value: string;
};

type Wallet = {
	assets: Asset[];
};
export enum TransactionType {
	MINT = 'MINT',
	SWAP = 'SWAP',
}
export type Transaction = {
	id: string;
	url: '';
	type: TransactionType;
	displayName: string;
	executedOn: string;
	incomingToken: Token;
	outgoingToken?: Token;
	value: string;
};

export enum ActionTypes {
	ADD_TRANSACTION = 'ADD_TRANSACTION',
	UPDATE_ASSET = 'UPDATE_ASSET',
	ADD_ASSET = 'ADD_ASSET',
	UPDATE_USER_ID = 'UPDATE_USER_ID',
	SET_ACTIVE_TRANSACTION = 'SET_ACTIVE_TRANSACTION',
	UNSET_ACTIVE_TRANSACTION = 'UNSET_ACTIVE_TRANSACTION',
}

type ActiveTransaction =
	| {
			id: string;
			type: TransactionType.MINT;
			args: MintArgs;
	  }
	| {
			id: string;
			type: TransactionType.SWAP;
			args: SwapArgs;
	  };

export type updateUserIdAction = {
	type: ActionTypes.UPDATE_USER_ID;
	payload: {
		userId: string;
	};
};

export type updateAssetAction = {
	type: ActionTypes.UPDATE_ASSET;
	payload: {
		asset: Asset;
	};
};
export type addAssetAction = {
	type: ActionTypes.ADD_ASSET;
	payload: {
		asset: Asset;
	};
};
export type addActivityAction = {
	type: ActionTypes.ADD_TRANSACTION;
	payload: {
		activity: Transaction;
	};
};

export type addActiveAction = {
	type: ActionTypes.SET_ACTIVE_TRANSACTION;
	payload: ActiveTransaction;
};

export type removeActiveAction = {
	type: ActionTypes.UNSET_ACTIVE_TRANSACTION;
};

export type UserContextState = {
	userId: string;
	wallet: Wallet;
	activity: Transaction[];
	activeTransaction: ActiveTransaction | null;
};

const INITIAL_STATE: UserContextState = {
	userId: getUserId(),
	wallet: {
		assets: [],
	},
	activeTransaction: null,
	activity: [
		{
			id: '1233312123',
			url: '',
			type: TransactionType.MINT,
			displayName: 'Mint',
			executedOn: '12344923934', // add a date lib to format
			incomingToken: {
				symbol: 'TK2',
				name: 'Token',
				address: '0x00',
			},
			value: '3000',
		},
		{
			id: '1233312123',
			url: '',
			type: TransactionType.SWAP,
			displayName: 'Swap',
			executedOn: '12344923934', // add a date lib to format
			incomingToken: {
				symbol: 'TK2',
				name: 'Token2',
				address: '0x00',
			},
			outgoingToken: {
				symbol: 'TK1',
				name: 'Token1',
				address: '0x00',
			},
			value: '2000',
		},
	],
};
type UserContextAction =
	| updateUserIdAction
	| updateAssetAction
	| addActivityAction
	| addAssetAction
	| addActiveAction
	| removeActiveAction;

const reducer = (state: UserContextState, action: UserContextAction): UserContextState => {
	switch (action.type) {
		case ActionTypes.UPDATE_USER_ID:
			return {
				...state,
				userId: action.payload.userId,
				wallet: {
					assets: [],
				},
				activity: [],
			};
		case ActionTypes.UPDATE_ASSET:
			return produce(state, (draft) => {
				draft.wallet.assets = draft.wallet.assets.map((asset) =>
					asset.token === action.payload.asset.token ? action.payload.asset : asset,
				);
			});
		case ActionTypes.ADD_ASSET:
			return produce(state, (draft) => {
				draft.wallet.assets.push(action.payload.asset);
			});
		case ActionTypes.ADD_TRANSACTION:
			return produce(state, (draft) => {
				draft.activity.push(action.payload.activity);
			});
		case ActionTypes.SET_ACTIVE_TRANSACTION:
			return {
				...state,
				activeTransaction: action.payload,
			};
		case ActionTypes.UNSET_ACTIVE_TRANSACTION:
			return {
				...state,
				activeTransaction: null,
			};
		default:
			throw new Error(`Unrecognized action in User Context Provider`);
	}
};

interface Context {
	state: UserContextState;
	dispatch: Dispatch<UserContextAction>;
}

export const UserContext = createContext<Context>({
	state: INITIAL_STATE,
	dispatch: () => null,
});

export const UserProvider: React.FC = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
	return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
};
