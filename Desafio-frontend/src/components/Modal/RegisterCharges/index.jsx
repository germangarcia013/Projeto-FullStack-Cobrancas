import { useState } from "react"
import "./styles.css"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Button,
    Box,
    Flex,
    Checkbox,
    Text,
    Textarea
} from '@chakra-ui/react'
import api from '../../../services/api'
import useGlobalContext from "../../../hooks/useGlobalContext"
import { useParams } from "react-router-dom"
import { useToast } from '@chakra-ui/react'


export default function RegisterCharges({ onClose, isOpen, clientId, nomeCliente, nomeClienteTeste }) {

    const { id } = useParams()
    const { token, setAddTransactionCharge, setErrorsInput, errorsInput } = useGlobalContext()
    const [errors, setErrors] = useState({
        descricao: '',
        vencimento: '',
        valor: '',
        status: ''
    });
    const toast = useToast()

    const [formAddCharge, setFormAddCharge] = useState({
        nome: nomeCliente,
        descricao: '',
        vencimento: '',
        valor: '',
        status: ''
    })


    async function handleSubmit(e) {
        e.preventDefault()

        if (!formAddCharge.descricao || !formAddCharge.vencimento || !formAddCharge.valor) {
            setErrorsInput(true)
            setErrors({
                ...errors,
                descricao: !formAddCharge.descricao ? 'Campo descricao é obrigatório' : '',
                vencimento: !formAddCharge.vencimento ? 'Campo vencimento é obrigatório' : '',
                valor: !formAddCharge.valor ? 'Campo valor é obrigatório' : '',
            })
            setTimeout(() => {
                setErrors('')
                setErrorsInput(false)
            }, 3000);
        }

        try {
            let endpoint = "";

            if (clientId) {
                endpoint = `/cadastrar/cobranca/${clientId}`;
            } else if (id) {
                endpoint = `/cadastrar/cobranca/${id}`;
            }


            await api.post(endpoint,
                {
                    descricao: formAddCharge.descricao,
                    vencimento: formAddCharge.vencimento,
                    valor: formAddCharge.valor,
                    status: formAddCharge.status
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            onClose()
            setFormAddCharge({
                ...formAddCharge,
                nome: '',
                descricao: '',
                vencimento: '',
                valor: '',
                status: ''
            })


            toast({
                description: 'Cobrança registrada com sucesso!',
                status: 'success',
                duration: 4000,
                isClosable: true,
                position: 'bottom-right'
            })


            const response = await api.get('/cobrancas',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

            const { cobrancas } = response.data

            setAddTransactionCharge(cobrancas)

        } catch (error) {
            if (error.response) {
                toast({
                    title: 'Erro!',
                    description: error.response.data.message || error.response.data,
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    position: 'top'
                })
            }
        }

    }

    function handleOnchange(e) {
        setFormAddCharge({ ...formAddCharge, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <form onSubmit={handleSubmit}>
                    <ModalContent maxW="500px" borderRadius="30px" h='73%' >
                        <ModalHeader
                            display="flex"
                            justifyContent="center"
                            fontSize="24px"
                            fontWeight="bold"
                            color="#343447"
                        >
                            Cadastro de Cobrança
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody padding='0 40px' maxHeight='1366px' overflowY='auto' >
                            <FormControl mt={4}>
                                <FormLabel>Nome*</FormLabel>
                                <Input
                                    placeholder='Digite seu nome'
                                    name='nome'
                                    value={nomeCliente}
                                    readOnly
                                />
                            </FormControl>

                            <FormControl mt={4} className={errorsInput && errors.descricao ? 'error-inputs' : ''}>
                                <FormLabel>Descrição*</FormLabel>
                                <Textarea
                                    placeholder='Digite sua descrição'
                                    name='descricao'
                                    value={formAddCharge.descricao}
                                    onChange={(e) => handleOnchange(e)}
                                />
                                <span>{errors.descricao}</span>

                            </FormControl>
                            <Box display="flex" gap="20px" >
                                <FormControl mt={4} className={errorsInput && errors.vencimento ? 'error-inputs' : ''}>
                                    <FormLabel>Vencimento</FormLabel>
                                    <Input
                                        type="date"
                                        name='vencimento'
                                        value={formAddCharge.vencimento}
                                        onChange={(e) => handleOnchange(e)}
                                    />
                                    <span>{errors.vencimento}</span>

                                </FormControl>
                                <FormControl mt={4} className={errorsInput && errors.valor ? 'error-inputs' : ''}>
                                    <FormLabel>Valor</FormLabel>
                                    <Input
                                        placeholder='Digite o valor'
                                        type="number"
                                        name='valor'
                                        value={formAddCharge.valor}
                                        onChange={(e) => handleOnchange(e)}
                                    />
                                    <span>{errors.valor}</span>

                                </FormControl>
                            </Box>
                            <FormControl mt={4} display="flex" flexDirection="column" >
                                <FormLabel>Status*</FormLabel>
                                <Box display="flex" flexDirection="column" gap="10px" >
                                    <Box bg="#F0F0F5" h="48px" display="flex" borderRadius="7px">
                                        <Checkbox
                                            size='lg' colorScheme='green' padding='0 20px'
                                            name='statusPago'
                                            checked={formAddCharge.status === 'paga'}
                                            onChange={(e) => {
                                                const newStatus = e.target.checked ? 'paga' : 'pendente';
                                                setFormAddCharge({ ...formAddCharge, status: newStatus });
                                            }}
                                        >
                                            <Text color="#3F3F55" fontSize='16px' fontWeight='500'>
                                                Cobrança Paga
                                            </Text>
                                        </Checkbox>
                                    </Box>
                                    <Box bg="#F0F0F5" h="48px" display="flex" borderRadius="7px"  >
                                        <Checkbox size='lg' colorScheme='green' padding='0 20px'
                                            name='statusPendente'
                                            checked={formAddCharge.status === 'pendente'}
                                            onChange={(e) => {
                                                const newStatus = e.target.checked ? 'pendente' : 'paga';
                                                setFormAddCharge({ ...formAddCharge, status: newStatus });
                                            }}
                                        >
                                            <Text
                                                color="#3F3F55" fontSize='16px' fontWeight='500'
                                            >
                                                Cobrança Pendente
                                            </Text>
                                        </Checkbox>
                                    </Box>
                                    <span>{errors.status}</span>
                                </Box>
                            </FormControl>
                        </ModalBody>


                        <Flex justifyContent="center" margin="25px 0" gap="15px" padding='0 40px'>
                            <Button h="35px" w="230px" color="#0E8750" bg="#F8F8F9"
                                onClick={onClose}
                            >
                                Cancelar
                            </Button>
                            <Button h="35px" w="230px" color="#F8F8F9" bg="#DA0175"
                                type="submit"
                            >
                                Aplicar
                            </Button>
                        </Flex>

                    </ModalContent>
                </form>
            </Modal>
        </>
    )
}