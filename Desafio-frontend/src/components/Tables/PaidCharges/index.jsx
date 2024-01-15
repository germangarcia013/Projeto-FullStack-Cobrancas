import { Link } from "react-router-dom"
import "./styles.css"
import IconCobrancaPag from "../../../assets/icon-cobranca-pag.svg"
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Box,
    Text
} from '@chakra-ui/react'
import { useEffect } from "react"
import api from "../../../services/api"
import useGlobalContext from "../../../hooks/useGlobalContext"
import { handleSum } from '../../../utils/formatters'
import { formatToMoney } from '../../../utils/formatters'

export default function PaidCharges() {

    const { token, cobrancaPaga, setCobrancaPaga } = useGlobalContext()

    useEffect(() => {

        setCobrancaPaga([])

        try {

            async function loadChargePaga() {
                const response = await api.get('/listarStatusCobrancas/paga/9999',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                const { cobrancas } = response.data

                setCobrancaPaga(cobrancas)
            }

            loadChargePaga()
        } catch (error) {
            console.log(error.message)
        }

    }, [])

    return (
        <Box className="main-tabela-cobrancas">
            <Box className="container-cobrancas-pag">
                <Box className="container-img-cobrancas">
                    <img src={IconCobrancaPag} />
                </Box>
                <Box className="container-valores">
                    <h3>Cobranças Pagas</h3>
                    <p>{formatToMoney(handleSum(cobrancaPaga))} </p>
                </Box>
            </Box>

            <Box className="container-tabela" >
                <Box className="sub-title-cobrancas">
                    <Text className="left-title">
                        Cobranças Pagas
                    </Text>
                    <Text className="right-score-pag">
                        {cobrancaPaga.length}
                    </Text>
                </Box>

                <TableContainer className="home-table-charges" >
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
                        {cobrancaPaga.slice(0, 4).map((pago) => (
                            <Tbody key={pago.id}>
                                <Tr>
                                    <Td fontSize="15px" paddingLeft='40px' overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'>
                                        {pago.nome_cliente}
                                    </Td>
                                    <Td fontSize="15px">
                                        {pago.id}
                                    </Td>
                                    <Td fontSize="15px" paddingRight='30px' overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'>
                                        {formatToMoney(pago.valor)}
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
        </Box >

    )
}