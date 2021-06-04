import { MultiTokenSuccessDialog } from 'components/MultiTokenSuccessDialog';
import { SuccessDialog } from 'components/SuccessDialog';
import React, { createContext, Dispatch, useReducer } from 'react';
import { useCallback } from 'react';
import { SplashLoader } from '../components/common/SplashLoader';

export enum ActionTypes {
	OPEN_SUCCESS = 'OPEN_SUCCESS',
	OPEN_MULTI_TOKEN_SUCCESS = 'OPEN_MULTI_TOKEN_SUCCESS',
	CLOSE_SUCCESS = 'CLOSE_SUCCESS',
	CLOSE_MULTI_TOKEN_SUCCESS = 'CLOSE_MULTI_TOKEN_SUCCESS',
	SHOW_LOADING = 'SHOW_LOADING',
	HIDE_LOADING = 'HIDE_LOADING',
}

export type CloseSuccessAction = {
	type: ActionTypes.CLOSE_SUCCESS;
};

export type CloseMultiTokenSuccessAction = {
	type: ActionTypes.CLOSE_MULTI_TOKEN_SUCCESS;
};

export type OpenSuccessAction = {
	type: ActionTypes.OPEN_SUCCESS;
	payload: {
		title: string;
		icon: string;
		text: string;
		link: string;
		buttonText: string;
	};
};

export type OpenMultiTokenSuccessAction = {
	type: ActionTypes.OPEN_MULTI_TOKEN_SUCCESS;
	payload: {
		title: string;
		icons: string[];
		text: string;
		links: string[];
		buttonText: string;
	};
};

export type ShowLoading = {
	type: ActionTypes.SHOW_LOADING;
};

export type HideLoading = {
	type: ActionTypes.HIDE_LOADING;
};

type NotificationsContextAction =
	| OpenSuccessAction
	| CloseSuccessAction
	| ShowLoading
	| HideLoading
	| OpenMultiTokenSuccessAction
	| CloseMultiTokenSuccessAction;

export interface NotificationContextState {
	success: {
		open: boolean;
		title: string;
		icon: string;
		text: string;
		link: string;
		buttonText: string;
	};
	multiTokenSuccess: {
		open: boolean;
		title: string;
		icons: string[];
		text: string;
		links: string[];
		buttonText: string;
	};
	loading: boolean;
}

interface Context {
	state: NotificationContextState;
	dispatch: Dispatch<NotificationsContextAction>;
	close: () => void;
}

const INITIAL_STATE: NotificationContextState = {
	success: {
		open: false,
		title: '',
		icon: '',
		text: '',
		link: '',
		buttonText: '',
	},
	multiTokenSuccess: {
		open: false,
		title: '',
		icons: [],
		text: '',
		links: [],
		buttonText: '',
	},
	loading: false,
};

const reducer = (
	state: NotificationContextState,
	action: NotificationsContextAction,
): NotificationContextState => {
	switch (action.type) {
		case ActionTypes.OPEN_SUCCESS:
			return {
				...state,
				success: {
					open: true,
					...action.payload,
				},
			};
		case ActionTypes.CLOSE_SUCCESS:
			return {
				...state,
				success: INITIAL_STATE.success,
			};
		case ActionTypes.SHOW_LOADING:
			return {
				...state,
				loading: true,
			};
		case ActionTypes.HIDE_LOADING:
			return {
				...state,
				loading: false,
			};
		case ActionTypes.OPEN_MULTI_TOKEN_SUCCESS:
			return {
				...state,
				multiTokenSuccess: {
					open: true,
					...action.payload,
				},
			};
		case ActionTypes.CLOSE_MULTI_TOKEN_SUCCESS:
			return {
				...state,
				multiTokenSuccess: INITIAL_STATE.multiTokenSuccess,
			};
		default:
			throw new Error(`Unrecognized action in Notifications Provider`);
	}
};

export const NotificationsContext = createContext<Context>({
	state: INITIAL_STATE,
	dispatch: () => null,
	close: () => undefined,
});

export const NotificationsProvider: React.FC = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

	const handleClose = useCallback(() => {
		dispatch({
			type: ActionTypes.CLOSE_SUCCESS,
		});
	}, [dispatch]);

	return (
		<NotificationsContext.Provider value={{ state, dispatch, close: handleClose }}>
			{children}
			<SuccessDialog />
			<MultiTokenSuccessDialog />
			<SplashLoader />
		</NotificationsContext.Provider>
	);
};
