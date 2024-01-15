import "./styles.css"
import { Avatar, Text, useDisclosure } from '@chakra-ui/react'
import iconModal from "../../assets/icon-modal.svg"
import EditPerfil from "../../assets/edit-perfil.svg"
import exitLogOut from "../../assets/exit-log-out.svg"
import { Box } from "@mui/material"
import EditUser from "../Modal/EditUser"
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverArrow, WrapItem, Flex, Img } from '@chakra-ui/react'
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import useGlobalContext from "../../hooks/useGlobalContext"

export default function Header() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [activeItem, setActiveItem] = useState("");
    const location = useLocation();
    const navigate = useNavigate()
    const { setToken, setUsuario, usuario } = useGlobalContext()
    const { id } = useParams()

    useEffect(() => {
        const pathname = location.pathname;

        if (pathname === "/home") {
            setActiveItem("home");
        } else if (pathname === "/clientes") {
            setActiveItem("clientes");
        } else if (pathname === `/clientes/${id}`) {
            setActiveItem("detalharClientes");
        } else if (pathname === "/cobrancas") {
            setActiveItem("cobrancas");
        } else {
            setActiveItem("");
        }
    }, [location]);

    function handleLogout() {
        navigate('/')
        setToken('')
        setUsuario('')
    }

    return (
        <div className="main-header-home">
            <div className="title-header">
                {activeItem === "home" && <h1>Resumo das Cobranças</h1> ||
                    activeItem === "clientes" && <p>Clientes</p> ||
                    activeItem === "detalharClientes" &&
                    <div className="detalhes-cliente">
                        <p>Clientes</p>
                        <p>{`>`}</p>
                        <p>Detalhes do Cliente</p>
                    </div> ||
                    activeItem === "cobrancas" && <p>Cobranças</p>
                }
            </div>

            <div className="container-perfil">
                <WrapItem>
                    <Avatar name={usuario.nome} size='md' bg='#DEDEE9' color='#0E8750' />
                </WrapItem>
                <h3>{usuario.nome}</h3>
                <Popover>
                    <PopoverTrigger>
                        <img src={iconModal} />
                    </PopoverTrigger>
                    <PopoverContent h="51px" w="92px">
                        <PopoverHeader>
                            <Flex
                                onClick={onOpen}
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Img src={EditPerfil} h='35px' />
                                <Img onClick={handleLogout} src={exitLogOut} h='35px' />
                            </Flex>
                        </PopoverHeader>
                        <PopoverArrow />
                    </PopoverContent>
                </Popover>
            </div>

            <EditUser
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
            />
        </div>
    )
}