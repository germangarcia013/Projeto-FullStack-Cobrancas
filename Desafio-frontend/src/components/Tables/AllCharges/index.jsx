import "./styles.css"
import iconEdit from "../../../assets/icon-edit2.svg"
import iconTrash from "../../../assets/icon-trash.svg"
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
    useDisclosure,
} from '@chakra-ui/react'
import useGlobalContext from "../../../hooks/useGlobalContext"
import { useEffect, useState } from "react"
import api from '../../../services/api'
import SearchNotFound from '../../SearchNotFound'
import Loading from "../../Loading"
import AlertDelete from "../../Modal/AlertDelete"
import DetailsCharges from "../../Modal/DetailsCharges"
import EditCharges from "../../Modal/EditCharges"
import { formatToMoney } from '../../../utils/formatters'
import { formatToDate } from '../../../utils/formatters'

export default function AllCharges({ searchInput }) {
    const {
        addTransactionCharge,
        token,
        setAddTransactionCharge,
        setLoading,
        loading,
        visibleMovies,
        selectedChargeId,
        setSelectedChargeId,
        handleCloseModal,
        selectedEditChargeId,
        setSelectedEditChargeId,
        setSelectedDataCharges,
        selectedDataCharges,
        editCharges,
        setEditCharges
    } = useGlobalContext()
    const { onOpen } = useDisclosure()

    const [sortedByName, setSortedByName] = useState(false)

    useEffect(() => {
        setLoading(true)
        async function loadCharge() {
            try {
                const response = await api.get('/cobrancas', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                const { cobrancas } = response.data

                setAddTransactionCharge(cobrancas)

            } catch (error) {
                console.log(error.response);
            } finally {
                setLoading(false)
            }
        }
        loadCharge()
    }, [editCharges])


    function handleSorted() {
        const sortedCharges = [...addTransactionCharge]

        sortedCharges.sort((a, b) => {
            if (a.nome_cliente.toLowerCase() < b.nome_cliente.toLowerCase()) return -1
        })

        if (sortedByName) {
            sortedCharges.reverse()
        }
        setAddTransactionCharge(sortedCharges)
        setSortedByName(!sortedByName)
    }



    const filteredCharge = addTransactionCharge.filter(charge =>
        visibleMovies || charge.nome_cliente.toLowerCase().includes(searchInput.toLowerCase())
    );


    if (loading) {
        return (<Loading />)
    }

    return (
        <>
            <TableContainer>
                <Table className="container-tables table-layout" bg="#FFFFFF" borderRadius="30px" padding="10px 10px" h='100%' >
                    <Thead>
                        <Tr>
                            <Th display="flex" alignItems="center" gap="5px" textTransform='capitalize' fontSize='16px' >
                                <Flex alignItems="center" gap="10px" onClick={handleSorted}>
                                    <img src={IconOrder} />
                                    Cliente
                                </Flex>
                            </Th>
                            <Th textTransform='capitalize' fontSize='16px'>
                                <Flex alignItems="center" gap="10px">
                                    ID Cob.
                                </Flex>
                            </Th>
                            <Th textTransform='capitalize' fontSize='16px'>Valor</Th>
                            <Th textTransform='capitalize' fontSize='16px'  >Data de venc</Th>
                            <Th textTransform='capitalize' fontSize='16px'>Status</Th>
                            <Th w="230px" textTransform='capitalize' fontSize='16px'>Descrição</Th>
                            <Th textTransform='capitalize' fontSize='16px'></Th>
                        </Tr>
                    </Thead>

                    <Tbody cursor='pointer' >
                        {!filteredCharge.some(charge => charge.nome_cliente !== addTransactionCharge.nome_cliente) ? (
                            <SearchNotFound />
                        ) : (
                            filteredCharge.map((charge) => (
                                <Tr key={charge.id}>
                                    <Td
                                        overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'
                                        onClick={() => setSelectedDataCharges(charge.id)}
                                    >
                                        {charge.nome_cliente}
                                    </Td>
                                    <Td
                                        onClick={() => setSelectedDataCharges(charge.id)}
                                    >
                                        {charge.id}
                                    </Td>
                                    <Td
                                        overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'
                                        onClick={() => setSelectedDataCharges(charge.id)}
                                    >
                                        {formatToMoney(charge.valor)}
                                    </Td>
                                    <Td
                                        overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'
                                        onClick={() => setSelectedDataCharges(charge.id)}
                                    >
                                        {formatToDate(charge.vencimento)}
                                    </Td>
                                    <Td onClick={() => setSelectedDataCharges(charge.id)}>
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
                                    <Td
                                        overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'
                                        onClick={() => setSelectedDataCharges(charge.id)}>
                                        {charge.descricao}
                                    </Td>
                                    <Td display="flex" gap="30px">
                                        <img src={iconEdit} onClick={() => setSelectedEditChargeId(charge.id)} />
                                        <img src={iconTrash} onClick={() => setSelectedChargeId(charge.id)} />
                                    </Td>
                                </Tr>
                            ))
                        )}
                    </Tbody>
                </Table>

                {selectedDataCharges !== null && addTransactionCharge.map((charge) => (
                    <DetailsCharges
                        key={charge.id}
                        onOpen={onOpen}
                        isOpen={selectedDataCharges === charge.id}
                        onClose={handleCloseModal}
                        nome={charge.nome_cliente}
                        descricao={charge.descricao}
                        vencimento={charge.vencimento}
                        valor={charge.valor}
                        idCobranca={charge.id}
                        status={charge.status}
                    />
                ))}


                {selectedEditChargeId !== null && addTransactionCharge.map((charge) => (
                    <EditCharges
                        key={charge.id}
                        onOpen={onOpen}
                        isOpen={selectedEditChargeId === charge.id}
                        onClose={handleCloseModal}
                        chargeId={charge.id}
                        chargeName={charge.nome_cliente}
                    />
                ))}


                {selectedChargeId !== null && addTransactionCharge.map((charge) => (
                    <AlertDelete
                        key={charge.id}
                        isOpen={selectedChargeId === charge.id}
                        onClose={handleCloseModal}
                        chargeId={charge.id}
                    />
                ))}

            </TableContainer >
        </>
    )
}