import React, { createContext, useCallback, Dispatch, useReducer, useContext } from "react";

interface IState {
  walletAddress: string;
  walletBalance: string;
}

interface IContext {
  state: IState;
  dispatch: Dispatch<{
    type: string;
    payload?: string;
  }>;
}

// Initial state
const initValue: IState = {
  walletAddress: "",
  walletBalance: "",
};

// Create Context
const Context = createContext<IContext>({
  state: initValue,
  dispatch: () => {},
});

// Context Provider
export const ReducerContextProvider: React.FC = (props) => {
  const reducer = useCallback(
    (
      preState: any,
      action: {
        type: string;
        payload?: string;
      }
    ) => {
      const { type, payload } = action;
      switch (type) {
        case "setWalletAddress":
          console.log("Setting wallet address");
          return {
            ...preState,
            walletAddress: payload,
          };
        case "setWalletBalance":
          console.log("Setting wallet balance");
          return {
            ...preState,
            walletBalance: payload,
          };

        default:
          return preState;
      }
    },
    []
  );
  const [state, dispatch] = useReducer(reducer, initValue);

  return <Context.Provider value={{ state, dispatch }}>{props.children}</Context.Provider>;
};

export const useReducerContext = () => {
  return useContext(Context);
};
