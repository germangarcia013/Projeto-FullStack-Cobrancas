import "./styles.css"
import Header from "../../components/Header"
import Siderbar from "../../components/SideBar"
import iconSearch from "../../assets/icon-search.svg"
import iconClientes from "../../assets/icon-clientes.svg"
import IconAleatorio from "../../assets/icon-aleatorio.svg"
import AllClients from "../../components/Tables/AllClients"
import { useDisclosure } from '@chakra-ui/react'
import { Box } from "@mui/material"
import { Input } from '@chakra-ui/react'
import RegisterClient from "../../components/Modal/RegisterClient"
import { useState } from "react"
import useGlobalContext from "../../hooks/useGlobalContext"


export default function Clients() {
    const { searchMovie } = useGlobalContext()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [searchInput, setSearchInput] = useState("");


    return (
        <div className="container-main-clientes">

            <Siderbar />

            <div className="container-main" >
                <div className='container-header'>
                    <Header />
                </div>
                <main className='container-details'>
                    <div className="container-search">
                        <div className="container-left-search">
                            <img src={iconClientes} />
                            <h1>Clientes</h1>
                        </div>
                        <div className="container-right-search">
                            <button onClick={onOpen}>+ Adicionar cliente</button>
                            <div>
                                <img src={IconAleatorio} />
                            </div>
                            <div className="container-input-search">
                                <div className='input-search'>
                                    <Input
                                        placeholder='Pesquisa'
                                        value={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)}

                                    />
                                </div>
                                <img src={iconSearch} onClick={searchMovie} />
                            </div>
                        </div>
                    </div>
                    <div className="table-clients">
                        <AllClients
                            searchInput={searchInput}
                        />
                    </div>
                </main>
                <RegisterClient
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                />
            </div>

        </div >

    )
} 