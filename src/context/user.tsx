import React, { createContext, Dispatch, useReducer } from 'react';
import { MintArgs } from 'services/API/mutations/useMint';
import { SwapArgs } from 'services/API/mutations/useSwap';
import { randomUserId } from '../utils/random';

const STORAGE_PREFIX = `starkware`;
const STORAGE_KEY = `${STORAGE_PREFIX}:user`;

interface UserData {
	activity: Transaction[];
	userId: string;
}

const getUserData = (): UserData => {
	const userDataString = localStorage.getItem(STORAGE_KEY);

	if (userDataString) {
		return JSON.parse(userDataString);
	}

	const userId = randomUserId();
	const userData = {
		userId,
		activity: [],
	};

	localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));

	return userData;
};

export enum TransactionType {
	MINT = 'MINT',
	SWAP = 'SWAP',
}

export enum ActionTypes {
	ADD_TRANSACTION = 'ADD_TRANSACTION',
	UPDATE_USER_ID = 'UPDATE_USER_ID',
	SET_ACTIVE_TRANSACTION = 'SET_ACTIVE_TRANSACTION',
	UNSET_ACTIVE_TRANSACTION = 'UNSET_ACTIVE_TRANSACTION',
}

export type Transaction =
	| {
			id: string;
			type: TransactionType.MINT;
			args: MintArgs;
			timestamp: string;
	  }
	| {
			id: string;
			type: TransactionType.SWAP;
			args: SwapArgs;
			timestamp: string;
	  };

export type updateUserIdAction = {
	type: ActionTypes.UPDATE_USER_ID;
	payload: {
		userId: string;
	};
};

export type addActiveAction = {
	type: ActionTypes.SET_ACTIVE_TRANSACTION;
	payload: Transaction;
};

export type removeActiveAction = {
	type: ActionTypes.UNSET_ACTIVE_TRANSACTION;
};

export type UserContextState = {
	userId: string;
	activity: Transaction[];
	activeTransaction: Transaction | null;
};

const INITIAL_USER_DATA = getUserData();

const INITIAL_STATE: UserContextState = {
	userId: INITIAL_USER_DATA.userId,
	activeTransaction: null,
	activity: INITIAL_USER_DATA.activity,
};
type UserContextAction = updateUserIdAction | addActiveAction | removeActiveAction;

const reducer = (state: UserContextState, action: UserContextAction): UserContextState => {
	switch (action.type) {
		case ActionTypes.UPDATE_USER_ID:
			return {
				...state,
				userId: action.payload.userId,
				activity: [],
			};
		case ActionTypes.SET_ACTIVE_TRANSACTION:
			localStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({
					userId: state.userId,
					activity: [...state.activity, action.payload],
				}),
			);

			return {
				...state,
				activeTransaction: action.payload,
				activity: [...state.activity, action.payload],
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
