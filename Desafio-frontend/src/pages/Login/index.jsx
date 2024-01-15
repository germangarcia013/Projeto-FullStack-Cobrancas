import { Stack, useToast } from '@chakra-ui/react'
import './styles.css'
import imgLogin from '../../assets/img-login.svg'
import { Input, InputRightElement, InputGroup, FormControl } from '@chakra-ui/react'
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import eyeClose from "../../assets/eye-close.svg"
import useGlobalContext from '../../hooks/useGlobalContext'
import api from '../../services/api'

export default function Login() {
    const { setToken, setUsuario, token, errorsInput, setErrorsInput } = useGlobalContext()
    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [errors, setErrors] = useState({
        email: '',
        senha: ''
    })
    const toast = useToast({
        position: 'top'
    }
    )

    const handleClick = () => setShow(!show)

    async function handleSubmit(e) {
        e.preventDefault()

        if (!email || !senha) {
            setErrorsInput(true)
            setErrors({
                ...errors,
                email: !email ? 'Campo e-mail é obrigatório' : '',
                senha: !senha ? 'Campo senha é obrigatório' : ''
            })
            setTimeout(() => {
                setErrors('')
                setErrorsInput(false)
            }, 3000);
            return
        }

        try {
            const response = await api.post('/login',
                {
                    email: email,
                    senha: senha
                });

            const { usuario, token } = response.data;
            const { nome } = usuario
            setToken(token)
            setUsuario(usuario)

            toast({
                title: `Bem-vindo, ${nome}`,
                status: 'success',
                duration: 5000,
                isClosable: true,
            })

            navigate('/home')

        } catch (error) {
            if (error.response) {
                toast({
                    description: error.response.data.message || error.response.data,
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    position: 'top - right'
                })
            }
        }
    }

    useEffect(() => {
        if (token) {
            navigate('/home');
        }
    }, [token])

    return (
        <div className='main-login'>
            <img
                className='left-login'
                src={imgLogin}
                alt='Imagem de um notebook e um copo com uma folha'
            />
            <div className='text'>
                <p >Gerencie todos os pagamentos da sua empresa em um só lugar</p>
            </div>
            <div className='container-right-login'>
                <form className='form-login' onSubmit={handleSubmit}>

                    <h1>Faça seu login!</h1>

                    <Stack>
                        <FormControl size='md' display='flex' flexDirection='column' gap='5px'
                            className={errorsInput && errors.email ? 'error-inputs' : ''}
                        >
                            <label htmlFor="email">E-mail</label>
                            <Input
                                placeholder='Digite seu e-mail'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            {errors &&
                                <p className='error-message'>
                                    {errors.email}
                                </p>
                            }

                        </FormControl>

                        <div className='recovery-pass'>
                            <label htmlFor="">Senha</label>
                            <Link to="#">
                                <span>Esqueceu a senha?</span>
                            </Link>
                        </div>
                        <InputGroup size='md' cursor="pointer"
                            className={errorsInput && errors.senha ? 'error-inputs' : ''}
                        >
                            <Input
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                placeholder='Digite sua senha'
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                            <InputRightElement width='4.5rem'>
                                <img
                                    h='1.75rem'
                                    size='sm'
                                    src={eyeClose}
                                    onClick={handleClick}
                                />
                            </InputRightElement>
                        </InputGroup>

                        {errors &&
                            <p className='error-message'>
                                {errors.senha}
                            </p>
                        }
                    </Stack>

                    <button
                        type='submit'
                    >
                        Entrar
                    </button>

                    <div className='register'>
                        <p>Ainda não possui uma conta?</p>
                        <Link to="/register">
                            <span>Cadastre-se</span>
                        </Link>
                    </div>
                </form>
            </div >
        </div >
    )
}

