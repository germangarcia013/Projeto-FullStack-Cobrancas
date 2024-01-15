import { Link } from "react-router-dom"
import "./styles.css"
import IconCobrancaPrev from "../../../assets/icon-cobranca-prev.svg"
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
import api from '../../../services/api'
import { useEffect, useState } from "react"
import useGlobalContext from "../../../hooks/useGlobalContext"
import { handleSum } from '../../../utils/formatters'
import { formatToMoney } from '../../../utils/formatters'

export default function ExpectedCharges() {

    const { token } = useGlobalContext()
    const [cobrancaPrevista, setCobrancaPrevista] = useState([])


    useEffect(() => {
        try {
            async function loadPrev() {
                const response = await api.get('/listarStatusCobrancas/pendente/99999',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })

                const { cobrancas } = response.data

                setCobrancaPrevista(cobrancas)
            }
            loadPrev()
        } catch (error) {
            console.log(error.message)
        }
    }, [])

    return (
        <Box className="main-tabela-cobrancas">
            <Box className="container-cobrancas-prev">
                <Box className="container-img-cobrancas">
                    <img src={IconCobrancaPrev} />
                </Box>
                <Box className="container-valores">
                    <h3>Cobranças Previstas</h3>
                    <p>{formatToMoney(handleSum(cobrancaPrevista))}</p>
                </Box>
            </Box>

            <Box className="container-tabela" >
                <Box className="sub-title-cobrancas">
                    <Box className="left-title">
                        Cobranças Previstas
                    </Box>
                    <Box className="right-score-pag-prev">
                        {cobrancaPrevista.length}
                    </Box>
                </Box>

                <TableContainer className="home-table-charges">
                    <Table size='sm' w="100%" className="table-layout" >
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
                        {cobrancaPrevista.slice(0, 4).map((prevista) => (
                            <Tbody key={prevista.id}>
                                <Tr>
                                    <Td fontSize="15px" paddingLeft='40px' overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'>
                                        {prevista.nome_cliente}
                                    </Td>
                                    <Td>
                                        {prevista.id}
                                    </Td>
                                    <Td>
                                        {formatToMoney(prevista.valor)}
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