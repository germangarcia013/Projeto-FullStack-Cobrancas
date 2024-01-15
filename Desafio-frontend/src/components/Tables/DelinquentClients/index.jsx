import { Link } from "react-router-dom"
import "./styles.css"
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Box
} from '@chakra-ui/react'
import IconClienteInam from "../../../assets/icon-cliente-inadimplente.svg"
import { useEffect, useState } from "react"
import api from '../../../services/api'
import useGlobalContext from "../../../hooks/useGlobalContext"


export default function DelinquentClients() {

    const { token } = useGlobalContext()
    const [clientesInadimplente, setClientesInadimplente] = useState([])

    useEffect(() => {
        try {
            async function loadClientsInadimplente() {
                const response = await api.get('/listarStatusClientes/Inadimplente/99999',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                const { clientes } = response.data

                setClientesInadimplente(clientes)
            };

            loadClientsInadimplente()

        } catch (error) {
            console.log(error.message)
        }
    }, [])


    return (
        <Box className="container-tabela-customer" >
            <Box className="sub-title-cobrancas-customer">
                <Box className="left-title-costumer">
                    <img src={IconClienteInam} />
                    <h3>Clientes Inadimplentes</h3>
                </Box>
                <Box className="right-score-pag-costumer" bg='#FFEFEF'>
                    {clientesInadimplente.length}
                </Box>
            </Box>

            <TableContainer className="home-table-clients">
                <Table size='md' w='100%' className="table-layout" >
                    <Thead>
                        <Tr>
                            <Th>Clientes</Th>
                            <Th>ID do clie.</Th>
                            <Th>CPF</Th>
                        </Tr>
                    </Thead>
                    {clientesInadimplente.slice(0, 4).map((Inadimplente) => (
                        <Tbody key={Inadimplente.id}>
                            <Tr>
                                <Td>{Inadimplente.nome}</Td>
                                <Td>{Inadimplente.id}</Td>
                                <Td>{Inadimplente.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}</Td>
                            </Tr>
                        </Tbody>
                    ))}

                </Table>
            </TableContainer>

            <Box className="container-verTodos">
                <Link to='/clientes'>Ver todos</Link>
            </Box>

        </Box>
    )
}