import { SuccessDialog } from 'components/SuccessDialog';
import React, { createContext, Dispatch, useReducer } from 'react';
import { useCallback } from 'react';

export enum ActionTypes {
	OPEN_SUCCESS = 'OPEN_SUCCESS',
	CLOSE = 'CLOSE',
}

export type CloseSuccessAction = {
	type: ActionTypes.CLOSE;
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

type NotificationsContextAction = OpenSuccessAction | CloseSuccessAction;

export interface NotificationContextState {
	success: {
		open: boolean;
		title: string;
		icon: string;
		text: string;
		link: string;
		buttonText: string;
	};
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
		case ActionTypes.CLOSE:
			return INITIAL_STATE;
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
			type: ActionTypes.CLOSE,
		});
	}, [dispatch]);

	return (
		<NotificationsContext.Provider value={{ state, dispatch, close: handleClose }}>
			{children}
			<SuccessDialog />
		</NotificationsContext.Provider>
	);
};
