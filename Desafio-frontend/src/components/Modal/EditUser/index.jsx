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
    Box,
    Flex,
    InputGroup,
    InputRightElement
} from '@chakra-ui/react'
import eyeClose from "../../../assets/eye-close.svg"
import useGlobalContext from "../../../hooks/useGlobalContext"
import api from "../../../services/api"
import { useEffect } from "react"
import InputMask from 'react-input-mask';
import { useToast } from '@chakra-ui/react'



export default function EditUser({ onClose, isOpen, onOpen }) {
    const { token, setUsuario } = useGlobalContext()
    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)
    const [formEditUser, setFormEditUser] = useState(
        {
            nome: '',
            email: '',
            cpf: '',
            telefone: '',
            senha: '',
            confirmarSenha: ''
        }
    )
    const toast = useToast()
    const [error, setError] = useState({
        nome: '',
        email: ''
    })

    async function handleSubmit(e) {
        e.preventDefault()


        if (!formEditUser.nome) {
            setError({ ...error, nome: 'Campo nome é obrigatório' })
            setTimeout(() => {
                setError({ ...error, nome: '' })
            }, 3000);
        }

        if (!formEditUser.email) {
            setError({ ...error, email: 'Campo e-mail é obrigatório' })
            setTimeout(() => {
                setError({ ...error, email: '' })
            }, 3000);
        }


        try {
            const response = await api.patch('/usuario/atualizar',
                {
                    nome: formEditUser.nome,
                    email: formEditUser.email,
                    cpf: formEditUser.cpf,
                    telefone: formEditUser.telefone,
                    senhaAtual: formEditUser.senha
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const { nome } = formEditUser
            setUsuario({ nome })
            onClose()
            setFormEditUser({
                ...formEditUser,
                nome: '',
                email: '',
                cpf: '',
                telefone: '',
                senha: ''
            })

            toast({
                description: 'Usuario atualizado com sucesso!',
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
        setFormEditUser({ ...formEditUser, [e.target.name]: e.target.value })
    }


    useEffect(() => {
        async function loadUser() {
            try {
                const response = await api.get('/usuario',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })

                const { nome, email, cpf, telefone } = response.data;

                setFormEditUser({
                    ...formEditUser,
                    nome: nome,
                    email: email,
                    cpf: cpf,
                    telefone: telefone
                })
            } catch (error) {
                console.log(error.response);
            }
        }
        if (isOpen) {
            loadUser();
        }
    }, [isOpen])

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <form onSubmit={handleSubmit}>
                    <ModalContent maxW="500px" minH="70%" borderRadius="30px" padding="20px 20px">
                        <ModalHeader
                            display="flex"
                            justifyContent="center"
                            fontSize="24px"
                            fontWeight="bold"
                            color="#343447"
                        >
                            Edite seu cadastro
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>Nome*</FormLabel>
                                <Input
                                    placeholder='Digite seu nome'
                                    name='nome'
                                    value={formEditUser.nome}
                                    onChange={(e) => handleOnChange(e)}
                                />
                                <span>{error.nome}</span>
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>E-mail*</FormLabel>
                                <Input
                                    placeholder='Digite seu e-mail'
                                    name='email'
                                    value={formEditUser.email}
                                    onChange={(e) => handleOnChange(e)}
                                />
                            </FormControl>
                            <Box display="flex" gap="20px" >
                                <FormControl mt={4}>
                                    <FormLabel>CPF</FormLabel>
                                    <InputMask
                                        className="inputMask"
                                        mask="999.999.999-99"
                                        placeholder='Digite seu CPF'
                                        name='cpf'
                                        value={formEditUser.cpf}
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>Telefone</FormLabel>
                                    <InputMask
                                        className="inputMask"
                                        placeholder='Digite seu telefone'
                                        name='telefone'
                                        value={formEditUser.telefone}
                                        onChange={(e) => handleOnChange(e)}
                                        mask="(99) 9 9999-9999 "
                                    />
                                </FormControl>
                            </Box>
                            <FormControl mt={4}>
                                <FormLabel>Senha*</FormLabel>

                                <InputGroup size='md' cursor="pointer">

                                    <Input
                                        pr='4.5rem'
                                        type={show ? 'text' : 'password'}
                                        placeholder='********'
                                        name='senha'
                                        value={formEditUser.senha}
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                    <InputRightElement width='4.5rem'>
                                        <img src={eyeClose} h='1.75rem' size='sm' onClick={() => setShow(!show)} />
                                    </InputRightElement>

                                </InputGroup>
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Confirmar senha*</FormLabel>
                                <InputGroup size='md' cursor="pointer">
                                    <Input
                                        pr='4.5rem'
                                        type={show2 ? 'text' : 'password'}
                                        placeholder='********'
                                        name='confirmarSenha'
                                        value={formEditUser.confirmarSenha}
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                    <InputRightElement width='4.5rem'>
                                        <img src={eyeClose} h='1.75rem' size='sm' onClick={() => setShow2(!show2)} />
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>

                        </ModalBody>

                        <Flex justifyContent="center" >
                            <button
                                className="btn-edit-cad"
                                type="submit"
                            >
                                Aplicar
                            </button>
                        </Flex>
                    </ModalContent>
                </form>
            </Modal>
        </>
    )
}