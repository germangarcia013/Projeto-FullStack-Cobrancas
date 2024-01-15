import './styles.css'
import IconClienteEmDia from "../../../assets/icon-cliente-emDia.svg"
import { Link } from "react-router-dom"
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
import { useEffect, useState } from "react"
import api from '../../../services/api'
import useGlobalContext from "../../../hooks/useGlobalContext"

export default function UpdatedClients() {


    const { token } = useGlobalContext()
    const [clientesEmDia, setClientesEmDia] = useState([])

    useEffect(() => {
        try {
            async function loadClientsEmDia() {
                const response = await api.get('/listarStatusClientes/em-dia/99999',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                const { clientes } = response.data

                setClientesEmDia(clientes)
            };

            loadClientsEmDia()

        } catch (error) {
            console.log(error.message)
        }
    }, [])


    return (
        <Box className="container-tabela-customer" >
            <Box className="sub-title-cobrancas-customer">
                <Box className="left-title-costumer">
                    <img src={IconClienteEmDia} />
                    <h3>Clientes em dia</h3>
                </Box>
                <Box className="right-score-pag-costumer" bg='#EEF6F6' color='#1FA7AF'>
                    {clientesEmDia.length}
                </Box>
            </Box>

            <TableContainer className="home-table-clients" >
                <Table size='md' className='table-layout' >
                    <Thead >
                        <Tr>
                            <Th>Cliente</Th>
                            <Th>ID da cob.</Th>
                            <Th >CPF</Th>
                        </Tr>
                    </Thead>
                    {clientesEmDia.slice(0, 4).map((emDia) => (
                        <Tbody key={emDia.id}>
                            <Tr >
                                <Td>{emDia.nome}</Td>
                                <Td>{emDia.id}</Td>
                                <Td>{emDia.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}</Td>
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