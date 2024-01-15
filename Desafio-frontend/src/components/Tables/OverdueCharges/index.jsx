import { Link } from "react-router-dom"
import "./styles.css"
import IconCobrancaVenc from "../../../assets/icon-cobranca-venc.svg"
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
import { handleSum } from '../../../utils/formatters'
import { formatToMoney } from '../../../utils/formatters'

export default function OverdueCharges() {
    const { token } = useGlobalContext()
    const [cobrancaVencida, setCobrancaVencida] = useState([])


    useEffect(() => {
        try {
            async function handleloadvencida() {
                const response = await api.get('/listarStatusCobrancas/vencida/99999',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })

                const { cobrancas } = response.data

                setCobrancaVencida(cobrancas)
            }
            handleloadvencida()
        } catch (error) {
            console.log(error.message)
        }
    }, [])

    return (
        <Box className="main-tabela-cobrancas">
            <Box className="container-cobrancas-venc">
                <Box className="container-img-cobrancas">
                    <img src={IconCobrancaVenc} />
                </Box>
                <Box className="container-valores">
                    <h3>Cobranças Vencidas</h3>
                    <p>{formatToMoney(handleSum(cobrancaVencida))}</p>
                </Box>
            </Box>

            <Box className="container-tabela">
                <Box className="sub-title-cobrancas">
                    <Box className="left-title">
                        Cobranças Vencidas
                    </Box>
                    <Box className="right-score-pag-venc">
                        {cobrancaVencida.length}
                    </Box>
                </Box>

                <TableContainer className="home-table-charges">
                    <Table size='sm' w="100%" className="table-layout">
                        <Thead >
                            <Tr >
                                <Th textTransform="none" fontSize="15px" h="60px" paddingLeft='40px' w="100px">
                                    Cliente
                                </Th>
                                <Th textTransform="none" fontSize="15px" w="80px">
                                    ID da cob.
                                </Th>
                                <Th textTransform="none" fontSize="15px" w="80px">
                                    Valor
                                </Th>
                            </Tr>
                        </Thead>
                        {cobrancaVencida.slice(0, 4).map((vencida) => (
                            <Tbody height='40px' key={vencida.id}>
                                <Tr>
                                    <Td fontSize="15px" paddingLeft='40px' overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'>
                                        {vencida.nome_cliente}
                                    </Td>
                                    <Td >
                                        {vencida.id}
                                    </Td>
                                    <Td>
                                        {formatToMoney(vencida.valor)}
                                    </Td>
                                </Tr>
                            </Tbody>
                        ))}

                    </Table>
                </TableContainer>
                <Box className="home-ver-todos">
                    <Link to='/cobrancas'>Ver todos</Link>
                </Box>
            </Box>


        </Box>
    )
}