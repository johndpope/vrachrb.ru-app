import React from "react";
import Header from "../../components/HeaderComponent/Header";

export const ContextApp = React.createContext();

export function Reducer(state, action){
    switch (action.type){
        case "AUTH":
            return { auth: { 
                auth: true,
                header: <Header />
            }}
        case "UNLOGIN":
            return { auth: !state.auth }
        default: 
            return state;
    }
}