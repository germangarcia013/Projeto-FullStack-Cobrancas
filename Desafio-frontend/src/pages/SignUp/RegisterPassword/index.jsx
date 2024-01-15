import Steps from "../../../components/Steps"
import "./styles.css"
import { Input, Stack } from '@chakra-ui/react'
import { Link, useNavigate } from "react-router-dom"
import { InputGroup, InputRightElement } from '@chakra-ui/react'
import stepNext2 from "../../../assets/step-next2.svg"
import { useState } from "react"
import eyeClose from "../../../assets/eye-close.svg"
import useGlobalContext from "../../../hooks/useGlobalContext"
import api from "../../../services/api"
import { useToast } from '@chakra-ui/react'


export default function RegisterPassword() {

    const { userInfo, errorsInput, setErrorsInput } = useGlobalContext()
    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')
    const toast = useToast()
    const navigate = useNavigate()
    const [errors, setErrors] = useState({
        senha: '',
        confirmarSenha: ''
    })

    async function handleSubmit(e) {
        e.preventDefault()

        if (!senha || !confirmarSenha) {
            setErrorsInput(true)
            setErrors({
                ...errors,
                senha: !senha ? 'Campo senha é obrigatório' : '',
                confirmarSenha: !confirmarSenha ? 'Campo Repita a senha é obrigatório' : ''
            });
            setTimeout(() => {
                setErrorsInput(false)
                setErrors('');
            }, 3000);
            return;
        }

        if (senha !== confirmarSenha) {
            setErrors({ ...errors, confirmarSenha: 'É necessário que as senhas sejam iguais.' })
            setTimeout(() => {
                setErrors({ ...errors, confirmarSenha: '' });
            }, 3000);
            return;
        }

        try {
            const response = await api.post('/usuario/cadastro',
                {
                    nome: userInfo.nome,
                    email: userInfo.email,
                    senha: senha
                })


            navigate('/register-sucess')

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

    return (
        <div className='main-register'>
            <Steps currentIndex={1} />

            <div className='container-right-login'>
                <form
                    className='form-login'
                    onSubmit={handleSubmit}
                >
                    <h1>Escolha uma senha</h1>
                    <Stack>
                        <label htmlFor="email">Senha*
                        </label>
                        <InputGroup size='md' cursor="pointer"
                            className={errorsInput && errors.senha ? 'error-inputs' : ''}
                        >
                            <Input
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                placeholder='********'
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                            <InputRightElement width='4.5rem'>
                                <img src={eyeClose} h='1.75rem' size='sm' onClick={() => setShow(!show)} />
                            </InputRightElement>

                        </InputGroup>
                        {errors &&
                            <p className='error-message'>
                                {errors.senha}
                            </p>
                        }
                    </Stack>
                    <Stack>
                        <label htmlFor="email">Repita a senha*</label>
                        <InputGroup size='md' cursor="pointer"
                            className={errorsInput && errors.confirmarSenha ? 'error-inputs' : ''}
                        >
                            <Input
                                pr='4.5rem'
                                type={show2 ? 'text' : 'password'}
                                placeholder='********'
                                value={confirmarSenha}
                                onChange={(e) => setConfirmarSenha(e.target.value)}
                            />
                            <InputRightElement width='4.5rem'>
                                <img src={eyeClose} h='1.75rem' size='sm' onClick={() => setShow2(!show2)} />
                            </InputRightElement>
                        </InputGroup>
                        {errors &&
                            <p className='error-message'>
                                {errors.confirmarSenha}
                            </p>
                        }
                    </Stack>
                    <button type="submit">Finalizar cadastro</button>

                    <div className='register'>
                        <p>Já possui uma conta? Faça seu</p>
                        <Link to="/login">
                            <span>Login</span>
                        </Link>
                    </div>
                </form>

                <img className='step-next' src={stepNext2} />

            </div >
        </div>
    )
}