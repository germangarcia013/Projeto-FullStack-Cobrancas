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
import { useParams } from "react-router-dom"
import useGlobalContext from "../../../hooks/useGlobalContext"
import { useEffect, useState } from "react"
import api from '../../../services/api'
import { useToast } from '@chakra-ui/react'

export default function EditCharges({ onOpen, isOpen, onClose, chargeId, chargeName }) {
    const toast = useToast()
    const { token, setEditCharges, setErrorsInput, errorsInput } = useGlobalContext()
    const [errors, setErrors] = useState({
        nome: '',
        descricao: '',
        vencimento: '',
        valor: '',
        status: ''
    });
    const [formEditCharges, setFormEditCharges] = useState({
        nome: chargeName,
        descricao: '',
        vencimento: '',
        valor: '',
        status: ''
    })

    async function handleSubmit(e) {
        e.preventDefault()

        if (!formEditCharges.descricao || !formEditCharges.vencimento || !formEditCharges.valor) {
            setErrorsInput(true)
            setErrors({
                ...errors,
                descricao: !formEditCharges.descricao ? 'Campo descricao é obrigatório' : '',
                vencimento: !formEditCharges.vencimento ? 'Campo vencimento é obrigatório' : '',
                valor: !formEditCharges.valor ? 'Campo valor é obrigatório' : '',
            })
            setTimeout(() => {
                setErrors('')
                setErrorsInput(false)
            }, 3000);
        }

        try {
            const response = await api.patch(`/cobranca/atualizar/${chargeId}`,
                {
                    descricao: formEditCharges.descricao,
                    vencimento: formEditCharges.vencimento,
                    valor: formEditCharges.valor,
                    status: formEditCharges.status
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const cobranca = response.data;
            setEditCharges(cobranca)
            onClose()
            setFormEditCharges({
                ...formEditCharges,
                nome: '',
                descricao: '',
                vencimento: '',
                valor: '',
                status: ''
            })


            toast({
                description: 'Cobrança atualizada com sucesso!',
                status: 'success',
                duration: 4000,
                isClosable: true,
                position: 'bottom-right'
            })


        } catch (error) {
            if (error.response) {
                toast({
                    description: error.response.data.message || error.response.data,
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    position: 'top'
                })
            }
        }
    }

    function handleOnChange(e) {
        setFormEditCharges({ ...formEditCharges, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        async function loadCharges() {
            try {
                const response = await api.get(`/cobranca/${chargeId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                const { descricao, vencimento, status, valor } = response.data[0]

                const formatarVencimento = vencimento.slice(0, 10)

                setFormEditCharges({
                    ...formEditCharges,
                    descricao: descricao,
                    vencimento: formatarVencimento,
                    status: status,
                    valor: valor
                })
            } catch (error) {
                console.log(error.message)
            }
        }
        if (isOpen) {
            loadCharges()
        }
    }, [isOpen])

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <form onSubmit={handleSubmit}>
                <ModalContent maxW="500px" borderRadius="30px" h='71%'>
                    <ModalHeader
                        display="flex"
                        justifyContent="center"
                        fontSize="24px"
                        fontWeight="bold"
                        color="#343447"
                    >
                        Edição de Cobrança
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={4} padding='0 40px' maxHeight='1366px' overflowY='auto' >
                        <FormControl>
                            <FormLabel>Nome*</FormLabel>
                            <Input
                                placeholder='Digite seu nome'
                                name='nome'
                                value={chargeName}
                                readOnly
                            />
                        </FormControl>

                        <FormControl mt={4} className={errorsInput && errors.descricao ? 'error-inputs' : ''}>
                            <FormLabel>Descrição*</FormLabel>
                            <Textarea
                                placeholder='Digite sua descrição'
                                name='descricao'
                                value={formEditCharges.descricao}
                                onChange={(e) => handleOnChange(e)}

                            />
                            <span>{errors.descricao}</span>

                        </FormControl>
                        <Box display="flex" gap="20px" >
                            <FormControl mt={4} className={errorsInput && errors.vencimento ? 'error-inputs' : ''}>
                                <FormLabel>Vencimento</FormLabel>
                                <Input
                                    type="date"
                                    name='vencimento'
                                    value={formEditCharges.vencimento}
                                    onChange={(e) => handleOnChange(e)}
                                />
                                <span>{errors.vencimento}</span>

                            </FormControl>
                            <FormControl mt={4} className={errorsInput && errors.valor ? 'error-inputs' : ''}>
                                <FormLabel>Valor</FormLabel>
                                <Input
                                    placeholder='Digite o valor'
                                    type="number"
                                    name='valor'
                                    value={formEditCharges.valor}
                                    onChange={(e) => handleOnChange(e)}
                                />
                                <span>{errors.valor}</span>

                            </FormControl>
                        </Box>
                        <FormControl mt={4} display="flex" flexDirection="column" >
                            <FormLabel>Status*</FormLabel>
                            <Box display="flex" flexDirection="column" gap="10px" >
                                <Box bg="#F0F0F5" h="48px" display="flex" borderRadius="7px">
                                    <Checkbox size='lg' colorScheme='green' padding='0 20px'
                                        name='statusPago'
                                        isChecked={formEditCharges.status === 'paga'}
                                        onChange={(e) => {
                                            const newStatus = e.target.checked ? 'paga' : 'pendente';
                                            setFormEditCharges({ ...formEditCharges, status: newStatus });
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
                                        isChecked={formEditCharges.status === 'pendente'}
                                        onChange={(e) => {
                                            const newStatus = e.target.checked ? 'pendente' : 'paga';
                                            setFormEditCharges({ ...formEditCharges, status: newStatus });
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
    )
}