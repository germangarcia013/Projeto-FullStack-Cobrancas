import { useState } from "react";
import { useLocalStorage } from "react-use";


function useGlobalContextProvider() {

    const [userInfo, setUserInfo] = useState({
        nome: '',
        email: ''
    });
    const [token, setToken, clearToken] = useLocalStorage('token');
    const [usuario, setUsuario, clearUsuario] = useLocalStorage('usuario');
    const [addTransactionCharge, setAddTransactionCharge] = useState([]);
    const [cobrancaPaga, setCobrancaPaga] = useState([]);
    const [registerClients, setRegisterClients] = useState([])
    const [editClient, setEditClient] = useState([])
    const [cobrancaCliente, setCobrancaCliente] = useState([])
    const [dataClients, setDataClients] = useState([])
    const [editCharges, setEditCharges] = useState([])
    const [loading, setLoading] = useState(true);
    const [visibleMovies, setVisibleMovies] = useState(true);
    const [selectedChargeId, setSelectedChargeId] = useState(null);
    const [selectedEditChargeId, setSelectedEditChargeId] = useState(null);
    const [selectedDataCharges, setSelectedDataCharges] = useState(null);
    const [selectedClientId, setSelectedClientId] = useState(null);
    const [errorsInput, setErrorsInput] = useState(false)


    const handleCloseModal = () => {
        setSelectedChargeId(null);
        setSelectedEditChargeId(null)
        setSelectedDataCharges(null)
        setSelectedClientId(null)
    };

    function searchMovie() {
        setVisibleMovies(!visibleMovies);
    }


    return {
        userInfo,
        setUserInfo,
        token,
        setToken,
        clearToken,
        usuario,
        setUsuario,
        clearUsuario,
        addTransactionCharge,
        setAddTransactionCharge,
        cobrancaPaga,
        setCobrancaPaga,
        registerClients,
        setRegisterClients,
        editClient,
        setEditClient,
        cobrancaCliente,
        setCobrancaCliente,
        dataClients,
        setDataClients,
        loading,
        setLoading,
        visibleMovies,
        setVisibleMovies,
        searchMovie,
        selectedChargeId,
        setSelectedChargeId,
        selectedEditChargeId,
        setSelectedEditChargeId,
        handleCloseModal,
        selectedDataCharges,
        setSelectedDataCharges,
        setSelectedClientId,
        selectedClientId,
        editCharges,
        setEditCharges,
        errorsInput,
        setErrorsInput
    }
}

export default useGlobalContextProvider;