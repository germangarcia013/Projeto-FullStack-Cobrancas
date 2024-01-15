import { Routes, Route, Navigate, Outlet, redirect } from "react-router-dom"
import Login from "../pages/Login"
import Register from "../pages/SignUp/Register"
import RegisterPassword from "../pages/SignUp/RegisterPassword"
import RegisterSucess from "../pages/SignUp/RegisterSucess"
import Home from "../pages/Home"
import Clients from "../pages/Clients"
import Charges from "../pages/Charges"
import ClientDetails from "../pages/ClientDetails"
import { GlobalContextProvider } from "../contexts/GlobalContextProvider"
import useGlobalContext from "../hooks/useGlobalContext"
import { Flex } from "@chakra-ui/react"

export default function MainRoutes() {

    function ProtectedRoutes({ redirectTo }) {
        const { token } = useGlobalContext()
        return token ? <Outlet /> : <Navigate to={redirectTo} />
    }

    return (
        <GlobalContextProvider>
            <Routes>
                <Route path="/" element={<Login />}>
                    <Route path="/login" element={<Login />} />
                </Route>
                <Route path="/register" element={<Register />} />
                <Route path="/register-password" element={<RegisterPassword />} />
                <Route path="/register-sucess" element={<RegisterSucess />} />

                <Route element={<ProtectedRoutes redirectTo='/login' />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/clientes" element={<Clients />} />
                    <Route path="/clientes/:id" element={<ClientDetails />} />
                    <Route path="*" element={<Flex justifyContent='center' h='100vh' alignItems='center' fontSize='30px'> 404 - Not found</Flex>} />
                    <Route path="/cobrancas" element={<Charges />} />
                </Route>
            </Routes >
        </GlobalContextProvider>
    )
}
