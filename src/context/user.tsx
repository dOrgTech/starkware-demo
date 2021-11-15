import { useTxNotifications } from 'hooks/notifications';
import React, { createContext, Dispatch, useContext, useReducer, useState } from 'react';
import { useQueryClient, useQuery } from 'react-query';
import { MintArgs } from 'services/API/mutations/useMint';
import { SwapArgs } from 'services/API/mutations/useSwap';
import { TransactionStatus } from 'services/API/types';
import { httpClient } from 'services/API/utils/http';
import { randomUserId } from '../utils/random';
import { ActionTypes as NotificationsActionTypes, NotificationsContext } from './notifications';

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

export type addTransactionAction = {
	type: ActionTypes.ADD_TRANSACTION;
	payload: Transaction;
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
type UserContextAction =
	| updateUserIdAction
	| addActiveAction
	| removeActiveAction
	| addTransactionAction;

const reducer = (state: UserContextState, action: UserContextAction): UserContextState => {
	switch (action.type) {
		case ActionTypes.UPDATE_USER_ID:
			return {
				...state,
				userId: action.payload.userId,
				activity: [],
			};
		case ActionTypes.SET_ACTIVE_TRANSACTION:
			return {
				...state,
				activeTransaction: action.payload,
			};
		case ActionTypes.ADD_TRANSACTION:
			localStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({
					userId: state.userId,
					activity: [...state.activity, action.payload],
				}),
			);

			return {
				...state,
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
	const [stop, setStop] = useState(false);

	const queryClient = useQueryClient();
	const { showSuccess, showError, closeSnackbar } = useTxNotifications();
	const { dispatch: notificationDispatch } = useContext(NotificationsContext);

	const displayNotifications = () => {
		if (!state.activeTransaction) return;

		if (state.activeTransaction.type === TransactionType.MINT) {
			const { mint1, mint2 } = state.activeTransaction.args;

			if (!mint2) {
				notificationDispatch({
					type: NotificationsActionTypes.OPEN_SUCCESS,
					payload: {
						title: `Success!`,
						icon: mint1.token.icon,
						text: `Received ${mint1.amount} ${mint1.token.symbol}`,
						txId: state.activeTransaction.id,
						buttonText: 'Go Back',
					},
				});
				return;
			}

			notificationDispatch({
				type: NotificationsActionTypes.OPEN_MULTI_TOKEN_SUCCESS,
				payload: {
					title: `Success!`,
					icons: [mint1.token.icon, mint2.token.icon],
					text: `Minted ${mint1.amount} ${mint1.token.symbol} & ${mint2.amount} ${mint2.token.symbol}`,
					txIds: [state.activeTransaction.id],
					buttonText: 'Go Back',
				},
			});
		}

		if (state.activeTransaction.type === TransactionType.SWAP) {
			const { to } = state.activeTransaction.args;
			notificationDispatch({
				type: NotificationsActionTypes.OPEN_SUCCESS,
				payload: {
					title: `Success!`,
					icon: to.token.icon,
					text: `Received ${to.amount} ${to.token.symbol}`,
					txId: state.activeTransaction.id,
					buttonText: 'Go Back',
				},
			});
		}
	};

	const handleTxSuccess = (data: TransactionStatus) => {
		//TODO: remove execution on rejected
		if (data.tx_status === 'PENDING' && data.block_id) {
			queryClient.resetQueries('accountBalance');
			setStop(true);
			closeSnackbar();
			showSuccess();
			dispatch({
				type: ActionTypes.ADD_TRANSACTION,
				payload: state.activeTransaction as Transaction,
			});
			dispatch({
				type: ActionTypes.UNSET_ACTIVE_TRANSACTION,
			});
			displayNotifications();
		}
	};

	const handleTxError = (error: unknown) => {
		console.error(`Error while querying for Tx ID ${state.activeTransaction?.id}: ${error}`);
		setStop(true);
		closeSnackbar();
		showError();
		dispatch({
			type: ActionTypes.UNSET_ACTIVE_TRANSACTION,
		});
	};

	useQuery(
		['txStatus', state.activeTransaction],
		async () => {
			setStop(false);
			const { data } = await httpClient.get<string>(
				`feeder_gateway/get_transaction_status?transactionHash=${state.activeTransaction?.id}`,
			);

			return data;
		},
		{
			onSuccess: handleTxSuccess,
			onError: handleTxError,
			enabled: !!state.activeTransaction,
			refetchInterval: stop ? false : 10000,
			refetchIntervalInBackground: true,
			refetchOnWindowFocus: false,
		},
	);

	return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
};
