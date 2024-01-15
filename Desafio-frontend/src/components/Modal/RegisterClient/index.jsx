import "./styles.css"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Button,
    Box,
    Flex,
    Text
} from '@chakra-ui/react'
import iconClientes from "../../../assets/icon-clientes.svg"
import { useEffect, useState } from "react"
import useGlobalContext from "../../../hooks/useGlobalContext"
import api from "../../../services/api"
import InputMask from 'react-input-mask';
import { useToast } from '@chakra-ui/react'


export default function RegisterClient({ onClose, isOpen, onOpen }) {

    const { token, setRegisterClients, setErrorsInput, errorsInput } = useGlobalContext()
    const toast = useToast()
    const [formClient, setFormClient] = useState({
        nome: '',
        email: '',
        cpf: '',
        telefone: '',
        endereco: '',
        complemento: '',
        cep: '',
        bairro: '',
        cidade: '',
        uf: '',
    })
    const [errors, setErrors] = useState({
        nome: '',
        email: '',
        cpf: '',
        telefone: ''
    })
    async function fetchAddressByCEP(cep) {
        try {
            const formattedCEP = cep.replace(/\D/g, '');
            const response = await fetch(`https://viacep.com.br/ws/${formattedCEP}/json/`);
            const data = await response.json();

            if (response.ok) {
                setFormClient(prevState => ({
                    ...prevState,
                    endereco: data.logradouro || '',
                    complemento: data.complemento || '',
                    bairro: data.bairro || '',
                    cidade: data.localidade || '',
                    uf: data.uf || ''
                }));
            } else {
                setFormClient(prevState => ({
                    ...prevState,
                    endereco: '',
                    complemento: '',
                    bairro: '',
                    cidade: '',
                    uf: ''
                }));
                console.error('CEP não encontrado');
            }
        } catch (error) {
            console.error('Erro ao buscar o CEP:', error);
        }
    }


    async function handleSubmit(e) {
        e.preventDefault()

        if (!formClient.nome || !formClient.email || !formClient.cpf || !formClient.telefone) {
            setErrorsInput(true)
            setErrors({
                ...errors,
                nome: !formClient.nome ? 'Este campo deve ser preenchido' : '',
                email: !formClient.email ? 'Este campo deve ser preenchido' : '',
                cpf: !formClient.cpf ? 'Este campo deve ser preenchido' : '',
                telefone: !formClient.telefone ? 'Este campo deve ser preenchido' : ''
            });
            setTimeout(() => {
                setErrors('');
                setErrorsInput(false)
            }, 3000);
            return;
        }

        try {
            await fetchAddressByCEP(formClient.cep);

            await api.post('/cadastroCliente',
                {
                    nome: formClient.nome,
                    email: formClient.email,
                    cpf: formClient.cpf.replace(/[^\d]/g, ''),
                    telefone: formClient.telefone.replace(/[^\d]/g, ''),
                    endereco: formClient.endereco,
                    complemento: formClient.complemento,
                    cep: formClient.cep,
                    bairro: formClient.bairro,
                    cidade: formClient.cidade,
                    uf: formClient.uf,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            onClose()
            setFormClient({
                ...formClient,
                nome: '',
                email: '',
                cpf: '',
                telefone: '',
                endereco: '',
                complemento: '',
                cep: '',
                bairro: '',
                cidade: '',
                uf: ''
            })

            toast({
                description: 'Cadastro concluído com sucesso',
                status: 'success',
                duration: 4000,
                isClosable: true,
                position: 'bottom-right'
            })

            const response = await api.get('/clientes',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

            const { clientes } = response.data

            setRegisterClients(clientes)

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

    function handleOnChange(e) {
        setFormClient({ ...formClient, [e.target.name]: e.target.value })
    }



    useEffect(() => {
        if (formClient.cep.replace(/\D/g, '').length === 8) {
            fetchAddressByCEP(formClient.cep);
        }
    }, [formClient.cep]);



    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />

                <form onSubmit={handleSubmit} >
                    <ModalContent borderRadius="30px" maxW="600px" h='80%' padding='0 20px'>

                        <ModalHeader
                            fontSize="24px"
                            fontWeight="bold"
                            color="#343447"
                        >
                            <Box display="flex" alignItems="center" gap="10px">
                                <img src={iconClientes} className="img-client" />
                                <Text>Cadastro do Cliente</Text>
                            </Box>
                        </ModalHeader>
                        <ModalCloseButton top="20px" right="30px" />
                        <ModalBody pb={3} maxHeight='1366px' overflowY='auto' >
                            <FormControl className={errorsInput && errors.nome ? 'error-inputs' : ''}>
                                <FormLabel>Nome*</FormLabel>
                                <Input
                                    placeholder='Digite seu nome'
                                    name='nome'
                                    value={formClient.nome}
                                    onChange={(e) => handleOnChange(e)}
                                />
                                <span>{errors.nome}</span>
                            </FormControl>

                            <FormControl mt={3} className={errorsInput && errors.email ? 'error-inputs' : ''}>
                                <FormLabel>E-mail*</FormLabel>
                                <Input
                                    placeholder='Digite seu e-mail'
                                    name='email'
                                    value={formClient.email}
                                    onChange={(e) => handleOnChange(e)}
                                />
                                <span>{errors.email}</span>
                            </FormControl>
                            <Box display="flex" gap="30px" >
                                <FormControl mt={3} className={errorsInput && errors.cpf ? 'error-inputs' : ''}>
                                    <FormLabel>CPF*</FormLabel>
                                    <InputMask
                                        className="inputMask"
                                        mask="999.999.999-99"
                                        placeholder='Digite seu CPF'
                                        name='cpf'
                                        value={formClient.cpf}
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                    <span>{errors.cpf}</span>
                                </FormControl>
                                <FormControl mt={3} className={errorsInput && errors.telefone ? 'error-inputs' : ''}>
                                    <FormLabel>Telefone*</FormLabel>
                                    <InputMask
                                        className="inputMask"
                                        mask="(99) 9 9999-9999"
                                        placeholder='Digite seu telefone'
                                        name='telefone'
                                        value={formClient.telefone}
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                    <span>{errors.telefone}</span>
                                </FormControl>
                            </Box>
                            <FormControl mt={3}>
                                <FormLabel>Endereço</FormLabel>
                                <Input
                                    placeholder='Digite o endereço'
                                    name='endereco'
                                    value={formClient.endereco}
                                    onChange={(e) => handleOnChange(e)}
                                />
                            </FormControl>
                            <FormControl mt={3}>
                                <FormLabel>Complemento</FormLabel>
                                <Input
                                    placeholder='Digite o complemento'
                                    name='complemento'
                                    value={formClient.complemento}
                                    onChange={(e) => handleOnChange(e)}
                                />
                            </FormControl>
                            <Box display="flex" gap="30px">
                                <FormControl mt={3}>
                                    <FormLabel>CEP</FormLabel>
                                    <InputMask
                                        className="inputMask"
                                        mask="99999-999"
                                        placeholder='Digite o CEP'
                                        name='cep'
                                        value={formClient.cep}
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                </FormControl>
                                <FormControl mt={3}>
                                    <FormLabel>Bairro</FormLabel>
                                    <Input
                                        placeholder='Digite o bairro'
                                        name='bairro'
                                        value={formClient.bairro}
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                </FormControl>
                            </Box>
                            <Box display="flex" gap="30px">
                                <FormControl mt={3}>
                                    <FormLabel>Cidade*</FormLabel>
                                    <Input
                                        placeholder='Digite a cidade' w="303px"
                                        name='cidade'
                                        value={formClient.cidade}
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                </FormControl>
                                <FormControl mt={3}>
                                    <FormLabel>UF*</FormLabel>
                                    <Input
                                        placeholder='Digite a UF'
                                        name='uf'
                                        value={formClient.uf}
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                </FormControl>
                            </Box>

                        </ModalBody>

                        <Flex justifyContent="center" margin="30px 0" gap="15px" >

                            <Button h="35px" w="230px" color="#0E8750" bg="#F8F8F9"
                                onClick={onClose}
                            >
                                Cancelar
                            </Button>

                            <Button
                                h="35px"
                                w="230px"
                                color="#F8F8F9"
                                bg="#DA0175"
                                type="submit"
                            >
                                Aplicar
                            </Button>
                        </Flex>

                    </ModalContent>

                </form>
            </Modal >
        </>
    )
}