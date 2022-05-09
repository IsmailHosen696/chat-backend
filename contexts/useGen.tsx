import React, { ReactNode, useContext, useReducer, useState } from 'react'
import { Actions, usertype } from '../types';

type SearchContext = {
    type: Actions.SEARCH_RECENT_TEXT,
    searchtext: string
}
type LoginContext = {
    type: Actions.USER_LOGIN,
    user: usertype
}
type LogoutContext = {
    type: Actions.USER_LOGOUT,
}

type ReducerActionType = SearchContext
    | LoginContext
    | LogoutContext

interface initialStateType {
    searchtext: string
    user: usertype | null
}
const intialState: initialStateType = {
    searchtext: "",
    user: null
}

const GenContext = React.createContext<{
    state: initialStateType,
    action: (name: ReducerActionType) => void
}>({
    state: intialState,
    action: () => { }
});

export const GenContextProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<initialStateType>(intialState);

    function action(name: ReducerActionType) {
        switch (name.type) {
            case Actions.SEARCH_RECENT_TEXT:
                return setState({
                    ...state,
                    searchtext: name.searchtext
                })
            case Actions.USER_LOGIN:
                return setState({
                    ...state,
                    user: name.user
                })
            case Actions.USER_LOGOUT:
                return setState({
                    ...state,
                    user: null
                })
            default:
                return setState(state)
        }
    }
    return (
        <GenContext.Provider value={{ state, action }}>
            {children}
        </GenContext.Provider>
    )
}

export default function useGen() {
    const context = useContext(GenContext);
    if (!context) throw Error("context is not working")
    return context
}
