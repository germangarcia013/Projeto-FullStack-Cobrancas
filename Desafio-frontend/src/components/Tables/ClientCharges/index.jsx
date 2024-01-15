import "./styles.css"
import { Box } from "@mui/material"
import iconOrder from "../../../assets/icon-order.svg"
import iconEdit from "../../../assets/icon-edit2.svg"
import iconTrash from "../../../assets/icon-trash.svg"
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
import RegisterCharges from "../../Modal/RegisterCharges"
import { useEffect, useState } from "react"
import useGlobalContext from "../../../hooks/useGlobalContext"
import { useParams } from "react-router-dom"
import AlertDelete from "../../Modal/AlertDelete"
import { formatToMoney } from '../../../utils/formatters'
import { formatToDate } from '../../../utils/formatters'
import EditCharges from "../../Modal/EditCharges"
import api from '../../../services/api'

export default function ClientCharges() {

    const {
        token,
        cobrancaCliente,
        selectedChargeId,
        handleCloseModal,
        setSelectedChargeId,
        selectedEditChargeId,
        setSelectedEditChargeId,
        addTransactionCharge,
        setCobrancaCliente,
        editCharges,
        dataClients
    } = useGlobalContext()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { id } = useParams()

    const [cliente] = dataClients;

    let nomeClienteCobranca = '';

    if (cliente) {
        nomeClienteCobranca = cliente.nome
    }


    useEffect(() => {
        async function loadCobrancas() {

            const response = await api.get(`/obterCobrancaId/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            const cobranca = response.data

            setCobrancaCliente([...cobranca])
        }

        loadCobrancas()
    }, [addTransactionCharge, editCharges])

    return (
        <Box bgcolor="#FFFFFF" borderRadius="30px" height='100%'>
            <Flex w="100%" justifyContent="space-between" align="center" h="40px" padding="40px 20px">
                <Text fontSize="18px" fontWeight="bold" color="#3F3F55">Cobranças do Cliente</Text>

                <Button
                    color="#F8F8F9" w="250px" h="35px" borderRadius="10px" bg="#DA0175"
                    onClick={onOpen}
                >
                    + Nova cobrança
                </Button>


            </Flex>
            <Box>
                <TableContainer>
                    <Table className="table-layout">
                        <Thead>
                            <Tr >
                                <Th>
                                    <Flex alignItems="center" gap="10px">
                                        <img src={iconOrder} />
                                        <Text>ID Cob.</Text>
                                    </Flex>
                                </Th>

                                <Th>
                                    <Flex alignItems="center" gap="10px">
                                        <img src={iconOrder} />
                                        <Text>Data de venc.</Text>
                                    </Flex>
                                </Th>


                                <Th>Valor</Th>
                                <Th>Status</Th>
                                <Th>Descrição</Th>
                            </Tr>
                        </Thead>
                        {cobrancaCliente.map((charge) => (
                            <Tbody key={charge.id}>
                                <Tr>
                                    <Td>{charge.id}</Td>
                                    <Td>{formatToDate(charge.vencimento)}</Td>
                                    <Td>{formatToMoney(charge.valor)}</Td>
                                    <Td>
                                        <Flex
                                            className={
                                                charge.status === 'vencida' && 'status-venc' ||
                                                charge.status === 'paga' && 'status-paga' ||
                                                charge.status === 'pendente' && 'status-prev'
                                            }
                                        >
                                            {charge.status}
                                        </Flex>
                                    </Td>
                                    <Td w="420px">{charge.descricao}</Td>

                                    <Td display="flex" gap="30px">
                                        <img src={iconEdit} onClick={() => setSelectedEditChargeId(charge.id)} />
                                        <img src={iconTrash} onClick={() => setSelectedChargeId(charge.id)} />
                                    </Td>
                                </Tr>
                            </Tbody>

                        ))}


                    </Table>
                </TableContainer>

                <RegisterCharges
                    onOpen={onOpen}
                    isOpen={isOpen}
                    onClose={onClose}
                    nomeCliente={nomeClienteCobranca}
                />



                {selectedEditChargeId !== null && cobrancaCliente.map((charge) => (
                    <EditCharges
                        key={charge.id}
                        isOpen={selectedEditChargeId === charge.id}
                        onClose={handleCloseModal}
                        chargeId={charge.id}
                        chargeName={charge.nome_cliente}
                    />
                ))}

                {selectedChargeId !== null && cobrancaCliente.map((charge) => (
                    <AlertDelete
                        key={charge.id}
                        isOpen={selectedChargeId === charge.id}
                        onClose={handleCloseModal}
                        chargeId={charge.id}
                    />
                ))}
            </Box>
        </Box>
    )
}