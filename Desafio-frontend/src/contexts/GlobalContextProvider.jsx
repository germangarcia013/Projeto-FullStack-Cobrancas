import useGlobalContextProvider from "../hooks/useGlobalContextProvider";
import { createContext } from "react";

const GlobalContext = createContext({});

export function GlobalContextProvider({ children }) {
    const globalProvider = useGlobalContextProvider();

    return (
        <GlobalContext.Provider value={globalProvider}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContext;