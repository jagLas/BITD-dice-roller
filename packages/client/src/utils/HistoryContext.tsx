import React, { createContext, useContext, useReducer } from "react"
import { Result, ResultColor, ResultType, calculateResult, getResultColor } from "./utils";

interface ResultHistoryItem {
    result?: Result;
    resultType?: ResultType;
    resultColor?: ResultColor;
    rollNumber: number;
}
const initialState: ResultHistoryItem[] = []

type ACTIONTYPE = {type: 'ADD_TO_HISTORY'; payload: Result}

function reducer(state: ResultHistoryItem[], action: ACTIONTYPE) {
    if (action.payload.length === 0) {
        return [...state];
    }
    switch (action.type) {
        case 'ADD_TO_HISTORY':
            const nextRollNumber = (state[0]?.rollNumber ?? 0) + 1;
            const resultType = calculateResult(action.payload);
            const resultColor = getResultColor(resultType);
            return [{result: action.payload, resultColor, resultType, rollNumber: nextRollNumber}, ...state]

        default:
            return [...state];
    }
}

const HistoryContext = createContext<{
    state: typeof initialState,
    dispatch: React.Dispatch<ACTIONTYPE>
}>
({state: initialState, dispatch: () => undefined})

export const HistoryProvider = ({children}: {children: React.ReactNode}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <HistoryContext.Provider value={{state, dispatch}}>
            {children}
        </HistoryContext.Provider>
    )
}

export const useHistory = () => {
    const {state} = useContext(HistoryContext);

    return state;
}

export const useDispatch = () => {
    const {dispatch} = useContext(HistoryContext);
    return dispatch;
}