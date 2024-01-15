import "./styles.css"
import iconCriarCobranca from "../../../assets/icon-criar-cobranca.svg"
import IconOrder from "../../../assets/icon-order.svg"
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Flex,
    Box
} from '@chakra-ui/react'
import RegisterCharges from "../../Modal/RegisterCharges"
import { useEffect, useState } from "react"
import useGlobalContext from "../../../hooks/useGlobalContext"
import { Link } from "react-router-dom"
import api from '../../../services/api'
import SearchNotFound from '../../SearchNotFound'
import Loading from "../../Loading"

export default function AllClients({ searchInput }) {

    const {
        setRegisterClients,
        registerClients,
        token,
        setLoading,
        loading,
        visibleMovies,
        addTransactionCharge,
        handleCloseModal,
        selectedClientId,
        setSelectedClientId,
        editCharges } = useGlobalContext()
    const [sortedByName, setSortedByName] = useState(false);

    useEffect(() => {
        setLoading(true)

        async function loadClient() {
            try {
                const response = await api.get('/clientes',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                const { clientes } = response.data

                setRegisterClients(clientes)

            } catch (error) {
                console.log(error.response);
            } finally {
                setLoading(false);
            }
        }

        loadClient()

    }, [addTransactionCharge])

    const sortClientsByName = () => {
        const sortedClients = [...registerClients];

        sortedClients.sort((a, b) => {
            if (a.nome.toLowerCase() < b.nome.toLowerCase()) return -1;
        });


        if (sortedByName) {
            sortedClients.reverse();
        }

        setRegisterClients(sortedClients);
        setSortedByName(!sortedByName);

    };

    if (loading) {
        return (<Loading />)
    }

    const filteredClients = registerClients.filter(client =>
        visibleMovies || client.nome.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <TableContainer>
            <Table className="table-layout" bg="#FFFFFF" borderRadius="20px" padding="10px 10px" h='100%' >
                <Thead >
                    <Tr >
                        <Th display="flex" alignItems="center" gap="5px" textTransform='capitalize' fontSize='16px'
                            onClick={sortClientsByName}
                        >
                            <img src={IconOrder} />
                            Cliente
                        </Th>
                        <Th textTransform='capitalize' fontSize='16px'>CPF</Th>
                        <Th textTransform='capitalize' fontSize='16px'>Email</Th>
                        <Th textTransform='capitalize' fontSize='16px'>Telefone</Th>
                        <Th textTransform='capitalize' fontSize='16px'>Status</Th>
                        <Th textTransform='capitalize' fontSize='16px'>Criar cobrança</Th>
                    </Tr>
                </Thead>

                <>
                    <Tbody >
                        {setRegisterClients && !filteredClients.some(client => client.nome !== registerClients.nome) ? (
                            <SearchNotFound />
                        ) : (

                            filteredClients.map((client) => (
                                <Tr key={client.id} >
                                    <Td overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'>
                                        <Link to={`/clientes/${client.id}`}>
                                            {client.nome}
                                        </Link>
                                    </Td>
                                    <Td overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'>
                                        <Link to={`/clientes/${client.id}`}>
                                            {client.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}
                                        </Link>
                                    </Td>
                                    <Td overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'>
                                        <Link to={`/clientes/${client.id}`}>
                                            {client.email}
                                        </Link>
                                    </Td>
                                    <Td overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'>
                                        <Link to={`/clientes/${client.id}`}>
                                            {client.telefone.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4')}
                                        </Link>
                                    </Td>
                                    <Td >
                                        <Flex
                                            className={
                                                client.status === 'Em dia' && 'status-em-dia' ||
                                                client.status === 'Inadimplente' && 'status-inadimplente'
                                            }
                                        >
                                            <Link to={`/clientes/${client.id}`}>
                                                {client.status}
                                            </Link>
                                        </Flex>

                                    </Td>
                                    <Td>
                                        <img src={iconCriarCobranca} onClick={() => setSelectedClientId(client.id)} />
                                    </Td>
                                </Tr>
                            ))
                        )}
                    </Tbody>

                    {selectedClientId !== null && registerClients.map((client) => (
                        <RegisterCharges
                            key={client.id}
                            isOpen={selectedClientId === client.id}
                            onClose={handleCloseModal}
                            clientId={client.id}
                            nomeCliente={client.nome}
                        />
                    ))}
                </>

            </Table>
        </TableContainer >

    )
}