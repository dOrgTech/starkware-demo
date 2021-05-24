import React, { createContext, Dispatch, useReducer } from 'react';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';

function getUUID() {
	return uuidv4();
}

function setUserId(uuid: string) {
	localStorage.setItem('userId', uuid);
}

function getUserId() {
	const currentUserId = localStorage.getItem('userId');
	if (!currentUserId) {
		const uuid = getUUID();
		setUserId(uuid);
		return uuid;
	}
	return currentUserId;
}

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
}

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

export type UserContextState = {
	userId: string;
	wallet: Wallet;
	activity: Transaction[];
};

const INITIAL_STATE: UserContextState = {
	userId: getUserId(),
	wallet: {
		assets: [],
	},
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
	| addAssetAction;

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
