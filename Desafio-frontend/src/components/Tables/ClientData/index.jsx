import "./styles.css"
import { Box } from "@mui/material"
import {
    Button,
    Text,
    Flex,
    TableContainer,
    Table, Thead,
    Tbody,
    Tr,
    Th,
    Td,
    useDisclosure
} from "@chakra-ui/react"
import iconClientes from "../../../assets/icon-clientes.svg"
import EditCliente from "../../Modal/EditClient"
import api from '../../../services/api'
import useGlobalContext from "../../../hooks/useGlobalContext"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Loading from "../../Loading"

export default function ClientData() {
    const { dataClients, editClient, setDataClients, token } = useGlobalContext()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [nomeCliente] = dataClients;
    const { id } = useParams()


    useEffect(() => {
        async function loadClients() {

            const response = await api.get(`/cliente/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            const cliente = response.data

            setDataClients([cliente])
        }
        loadClients()
    }, [editClient])


    return (
        <>
            <div className="container-title-cliente">
                <img src={iconClientes} />
                <h1>{nomeCliente && nomeCliente.nome}</h1>
            </div>
            <Box bgcolor="#FFFFFF" borderRadius="30px" height='300px' >

                <Flex w="100%" justifyContent="space-between" align="center" h="40px" padding="40px 20px">
                    <Text fontSize="18px" fontWeight="bold" color="#3F3F55">
                        Dados do cliente
                    </Text>
                    <Button color="#0E8750" w="250px" h="35px" borderRadius="10px" onClick={onOpen}>
                        Editar Cliente
                    </Button>
                </Flex>

                <Flex flexDirection="column" gap="20px" h='230px' justifyContent='space-between'>
                    <TableContainer h='100px'>
                        <Table className="table-layout">
                            <Thead>
                                <Tr>
                                    <Th width="312px" textTransform='capitalize' fontSize='16px' >Email</Th>
                                    <Th width="245px" textTransform='capitalize' fontSize='16px'>Telefone</Th>
                                    <Th textTransform='capitalize' fontSize='16px'>CPF</Th>
                                </Tr>
                            </Thead>
                            {dataClients.map((data) => (
                                <Tbody key={data.id}>
                                    <Tr>
                                        <Td h='50px' fontSize='17px'>
                                            {data.email}
                                        </Td>
                                        <Td>
                                            {data.telefone.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4')}
                                        </Td>
                                        <Td>
                                            {data.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}
                                        </Td>
                                    </Tr>
                                </Tbody>
                            ))}

                        </Table>
                    </TableContainer>

                    <TableContainer h='110px'>
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th textTransform='capitalize' fontSize='16px'>Endereço</Th>
                                    <Th textTransform='capitalize' fontSize='16px'>Bairro</Th>
                                    <Th textTransform='capitalize' fontSize='16px'>Complemento</Th>
                                    <Th textTransform='capitalize' fontSize='16px'>CEP</Th>
                                    <Th textTransform='capitalize' fontSize='16px'>Cidade</Th>
                                    <Th textTransform='capitalize' fontSize='16px'>UF</Th>
                                </Tr>
                            </Thead>
                            {dataClients.map((data) => (
                                <Tbody key={data.id}>
                                    <Tr>
                                        <Td h='50px' >{data.endereco}</Td>
                                        <Td>{data.bairro}</Td>
                                        <Td>{data.complemento}</Td>
                                        <Td>{data.cep}</Td>
                                        <Td>{data.cidade}</Td>
                                        <Td>{data.uf}</Td>

                                    </Tr>
                                </Tbody>
                            ))}

                        </Table>
                    </TableContainer>
                </Flex>
                <EditCliente
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                />
            </Box>
        </>
    )
}