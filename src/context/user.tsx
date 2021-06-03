import React, { createContext, Dispatch, useReducer } from 'react';
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

export type addActivityAction = {
	type: ActionTypes.ADD_TRANSACTION;
	payload: {
		activity: Transaction;
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

const INITIAL_STATE: UserContextState = {
	userId: getUserId(),
	activeTransaction: null,
	activity: [],
};
type UserContextAction =
	| updateUserIdAction
	| addActivityAction
	| addActiveAction
	| removeActiveAction;

const reducer = (state: UserContextState, action: UserContextAction): UserContextState => {
	switch (action.type) {
		case ActionTypes.UPDATE_USER_ID:
			return {
				...state,
				userId: action.payload.userId,
				activity: [],
			};
		case ActionTypes.ADD_TRANSACTION:
			return {
				...state,
				activity: [...state.activity, action.payload.activity],
			};
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
