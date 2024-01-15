import "./styles.css"
import Header from "../../components/Header"
import Siderbar from "../../components/SideBar"
import iconSearch from "../../assets/icon-search.svg"
import iconCobrancas from "../../assets/icon-cobrancas.svg"
import IconAleatorio from "../../assets/icon-aleatorio.svg"
import { Box } from "@mui/material"
import { Input } from '@chakra-ui/react'
import AllCharges from "../../components/Tables/AllCharges"
import { useState } from "react"
import useGlobalContext from "../../hooks/useGlobalContext"

export default function Charges() {

    const { searchMovie } = useGlobalContext()
    const [searchInput, setSearchInput] = useState("");

    return (
        <div className="container-main-cobranca">

            <Siderbar />

            <div className="container-main" >
                <div className='container-header'>
                    <Header />
                </div>
                <div className='container-details'>
                    <div className="container-search">
                        <div className="container-left-search">
                            <img src={iconCobrancas} />
                            <h1>Cobranças</h1>
                        </div>
                        <div className="container-right-search-charge">
                            <div>
                                <img src={IconAleatorio} />
                            </div>
                            <div className="container-input-search">
                                <Box boxShadow="0.5px 0.5px 3px 0.5px #F5A8D0" borderRadius='5px'>
                                    <Input
                                        placeholder='Pesquisa'
                                        vale={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)}
                                    />
                                </Box>
                                <img src={iconSearch} onClick={searchMovie} />
                            </div>
                        </div>
                    </div>
                    <div className="table-charges">
                        <AllCharges
                            searchInput={searchInput}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}