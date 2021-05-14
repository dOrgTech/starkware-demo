import { Token } from "components/Swap";
import React, { createContext, Dispatch, useReducer } from "react";
import { useCallback } from "react";

export enum ActionTypes {
  OPEN_SUCCESS = "OPEN_SUCCESS",
  OPEN_SELECT_TOKEN = "OPEN_SELECT_TOKEN",
  CLOSE = "CLOSE",
}

type CloseSuccessAction = {
  type: ActionTypes.CLOSE;
};

type OpenSuccessAction = {
  type: ActionTypes.OPEN_SUCCESS;
};

type OpenSelectTokenAction = {
  type: ActionTypes.OPEN_SELECT_TOKEN;
  payload: {
    tokens: Token[]
  }
};

type ModalsContextAction =
  | OpenSuccessAction
  | OpenSelectTokenAction
  | CloseSuccessAction

interface ModalContextState {
  selectToken: {
    tokens: Token[],
    open: boolean,
  },
  success: {
    open: boolean
  }
}

interface Context {
  state: ModalContextState;
  dispatch: Dispatch<ModalsContextAction>;
  close: () => void
}

const INITIAL_STATE: ModalContextState = {
  selectToken: {
    tokens: [],
    open: false,
  },
  success: {
    open: false
  }
};

const reducer = (
  state: ModalContextState,
  action: ModalsContextAction
): ModalContextState => {
  switch (action.type) {
    case ActionTypes.OPEN_SUCCESS:
      return {
        ...state,
        success: {
          open: true
        }
      };
    case ActionTypes.OPEN_SELECT_TOKEN:
      return {
        ...state,
        selectToken: {
          open: true,
          tokens: action.payload.tokens
        }
      };
    case ActionTypes.CLOSE:
      return INITIAL_STATE;
    default:
      throw new Error(`Unrecognized action in Modals Provider`);
  }
};

export const ModalsContext = createContext<Context>({
  state: INITIAL_STATE,
  dispatch: () => null,
  close: () => undefined
});

export const ModalsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const handleClose = useCallback(() => {
    dispatch({
      type: ActionTypes.CLOSE,
    });
  }, [dispatch]);

  return (
    <ModalsContext.Provider value={{ state, dispatch, close: handleClose }}>
      {children}
    </ModalsContext.Provider>
  );
};