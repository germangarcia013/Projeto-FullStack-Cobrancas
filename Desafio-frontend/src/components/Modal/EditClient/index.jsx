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
    Text
} from '@chakra-ui/react'
import iconClientes from "../../../assets/icon-clientes.svg"
import InputMask from 'react-input-mask';
import { useEffect, useState } from "react";
import api from '../../../services/api'
import useGlobalContext from "../../../hooks/useGlobalContext";
import { useParams } from "react-router-dom";
import { useToast } from '@chakra-ui/react'


export default function EditClient({ onClose, isOpen }) {
    const { id } = useParams()
    const { token, setEditClient, setErrorsInput, errorsInput } = useGlobalContext()
    const toast = useToast()
    const [formEditClient, setFormEditClient] = useState(
        {
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
                setFormEditClient({
                    ...formEditClient,
                    endereco: data.logradouro || '',
                    complemento: data.complemento || '',
                    bairro: data.bairro || '',
                    cidade: data.localidade || '',
                    uf: data.uf || ''
                });
            } else {
                setFormEditClient({
                    ...formEditClient,
                    endereco: '',
                    complemento: '',
                    bairro: '',
                    cidade: '',
                    uf: ''
                });
                console.error('CEP não encontrado');
            }
        } catch (error) {
            console.error('Erro ao buscar o CEP:', error);
        }
    }


    async function handleSubmit(e) {
        e.preventDefault()

        if (!formEditClient.nome || !formEditClient.email || !formEditClient.cpf || !formEditClient.telefone) {
            setErrorsInput(true)
            setErrors({
                ...errors,
                nome: !formEditClient.nome ? 'Este campo deve ser preenchido' : '',
                email: !formEditClient.email ? 'Este campo deve ser preenchido' : '',
                cpf: !formEditClient.cpf ? 'Este campo deve ser preenchido' : '',
                telefone: !formEditClient.telefone ? 'Este campo deve ser preenchido' : ''
            });
            setTimeout(() => {
                setErrors('');
                setErrorsInput(false)
            }, 3000);
            return;
        }


        try {

            await fetchAddressByCEP(formEditClient.cep)

            const response = await api.patch(`/cliente/atualizar_cadastro/${id}`,
                {
                    nome: formEditClient.nome,
                    email: formEditClient.email,
                    cpf: formEditClient.cpf.replace(/[^\d]/g, ''),
                    telefone: formEditClient.telefone.replace(/[^\d]/g, ''),
                    endereco: formEditClient.endereco,
                    complemento: formEditClient.complemento,
                    cep: formEditClient.cep,
                    bairro: formEditClient.bairro,
                    cidade: formEditClient.cidade,
                    uf: formEditClient.uf
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            const client = response.data;
            setEditClient(client)
            onClose()
            setFormEditClient({
                ...formEditClient,
                nome: '',
                email: '',
                cpf: '',
                telefone: ''
            })

            toast({
                description: 'Edições do cadastro concluídas com sucesso',
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

    function handleOnChage(e) {
        setFormEditClient({ ...formEditClient, [e.target.name]: e.target.value })
    }


    useEffect(() => {
        async function loadClient() {
            try {
                const response = await api.get(`/cliente/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })

                const client = response.data;

                setFormEditClient({
                    ...formEditClient,
                    nome: client.nome,
                    email: client.email,
                    cpf: client.cpf,
                    telefone: client.telefone,
                })

            } catch (error) {
                console.log(error.response);
            }
        }

        if (isOpen) {
            loadClient();
        }
    }, [isOpen])


    useEffect(() => {
        if (formEditClient.cep.replace(/\D/g, '').length === 8) {
            fetchAddressByCEP(formEditClient.cep);
        }
    }, [formEditClient.cep]);

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <form onSubmit={handleSubmit}>
                    <ModalContent borderRadius="30px" maxW="600px" h='80%' padding="0 30px">
                        <ModalHeader
                            fontSize="24px"
                            fontWeight="bold"
                            color="#343447"
                        >
                            <Box display="flex" alignItems="center" gap="10px">
                                <img src={iconClientes} className="img-client" />
                                <Text>Editar Cliente</Text>
                            </Box>
                        </ModalHeader>
                        <ModalCloseButton top="20px" right="30px" />
                        <ModalBody pb={3} maxHeight='1366px' overflowY='auto' >
                            <FormControl className={errorsInput && errors.nome ? 'error-inputs' : ''}>
                                <FormLabel>Nome*</FormLabel>
                                <Input
                                    placeholder='Digite seu nome'
                                    name='nome'
                                    value={formEditClient.nome}
                                    onChange={(e) => handleOnChage(e)}
                                />
                                <span>{errors.nome}</span>
                            </FormControl>

                            <FormControl mt={3} className={errorsInput && errors.email ? 'error-inputs' : ''}>
                                <FormLabel>E-mail*</FormLabel>
                                <Input
                                    placeholder='Digite seu e-mail'
                                    name='email'
                                    value={formEditClient.email}
                                    onChange={(e) => handleOnChage(e)}
                                />
                                <span>{errors.email}</span>
                            </FormControl>
                            <Box display="flex" gap="20px" >
                                <FormControl mt={3} className={errorsInput && errors.cpf ? 'error-inputs' : ''}>
                                    <FormLabel>CPF*</FormLabel>
                                    <InputMask
                                        className="inputMask"
                                        mask="999.999.999-99"
                                        placeholder='Digite seu CPF'
                                        name='cpf'
                                        value={formEditClient.cpf}
                                        onChange={(e) => handleOnChage(e)}
                                    />
                                    <span>{errors.cpf}</span>

                                </FormControl>
                                <FormControl mt={3} className={errorsInput && errors.telefone ? 'error-inputs' : ''}>
                                    <FormLabel>Telefone*</FormLabel>

                                    <InputMask
                                        className="inputMask"
                                        mask="(99) 9 9999-9999"
                                        placeholder='Digite seu telefone'
                                        maskChar="_"
                                        name='telefone'
                                        value={formEditClient.telefone}
                                        onChange={(e) => handleOnChage(e)}
                                    />
                                    <span>{errors.telefone}</span>

                                </FormControl>
                            </Box>
                            <FormControl mt={3}>
                                <FormLabel>Endereço</FormLabel>
                                <Input
                                    placeholder='Digite o endereço'
                                    name='endereco'
                                    value={formEditClient.endereco}
                                    onChange={(e) => handleOnChage(e)}
                                />
                            </FormControl>
                            <FormControl mt={3}>
                                <FormLabel>Complemento</FormLabel>
                                <Input
                                    placeholder='Digite o complemento'
                                    name='complemento'
                                    value={formEditClient.complemento}
                                    onChange={(e) => handleOnChage(e)}
                                />
                            </FormControl>
                            <Box display="flex" gap="20px" >
                                <FormControl mt={3}>
                                    <FormLabel>CEP</FormLabel>
                                    <InputMask
                                        className="inputMask"
                                        mask="99999-999"
                                        placeholder='Digite o CEP'
                                        name='cep'
                                        value={formEditClient.cep}
                                        onChange={(e) => handleOnChage(e)}
                                    />
                                </FormControl>
                                <FormControl mt={3}>
                                    <FormLabel>Bairro</FormLabel>
                                    <Input
                                        placeholder='Digite o bairro'
                                        name='bairro'
                                        value={formEditClient.bairro}
                                        onChange={(e) => handleOnChage(e)}
                                    />
                                </FormControl>
                            </Box>
                            <Box display="flex" gap="20px" >
                                <FormControl mt={3}>
                                    <FormLabel>Cidade*</FormLabel>
                                    <Input
                                        placeholder='Digite a cidade' w="303px"
                                        name='cidade'
                                        value={formEditClient.cidade}
                                        onChange={(e) => handleOnChage(e)}
                                    />
                                </FormControl>
                                <FormControl mt={3}>
                                    <FormLabel>UF*</FormLabel>
                                    <Input
                                        placeholder='Digite a UF'
                                        name='uf'
                                        value={formEditClient.uf}
                                        onChange={(e) => handleOnChage(e)}
                                    />
                                </FormControl>
                            </Box>
                        </ModalBody>
                        <Flex justifyContent="center" gap="15px" margin='30px 0'>
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
            </Modal >
        </>
    )
}