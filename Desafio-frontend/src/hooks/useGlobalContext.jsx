import { useContext } from "react";
import GlobalContextProvider from "../contexts/GlobalContextProvider"


function useGlobalContext() {
    return useContext(GlobalContextProvider);
}

export default useGlobalContext