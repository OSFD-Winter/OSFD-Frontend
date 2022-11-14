import React, {
    createContext,
    useCallback,
    Dispatch,
    useReducer,
    useContext,
} from "react";

interface IState {
    walletAddress: string;
}

interface IContext {
    state: IState;
    dispatch: Dispatch<{
        type: string;
        payload?: Partial<IState>;
    }>;
}

// Initial state
const initValue: IState = {
    walletAddress: "",
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
                payload?: Partial<IState>;
            }
        ) => {
            const { type, payload } = action;
            switch (type) {
                case "setAddress":
                    return {
                        ...preState,
                        walletAddress: payload,
                    };

                default:
                    return preState;
            }
        },
        []
    );
    const [state, dispatch] = useReducer(reducer, initValue);

    return (
        <Context.Provider value={{ state, dispatch }}>
            {props.children}
        </Context.Provider>
    );
};

export const useReducerContext = () => {
    return useContext(Context);
};
