import { initialState, reducer, Action, State } from './state.reducer';
import React, { ReactNode } from 'react';

export const StateContext = React.createContext<
    [State, (action: Action) => void]
>([initialState, () => {}]);

export const StateProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    return (
        <StateContext.Provider value={[state, dispatch]}>
            {children}
        </StateContext.Provider>
    );
};
