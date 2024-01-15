import Steps from '../../../components/Steps'
import './styles.css'
import { Input } from '@chakra-ui/react'
import { Link } from "react-router-dom"
import { Stack } from '@chakra-ui/react'
import stepNext from "../../../assets/step-next.svg"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useGlobalContext from '../../../hooks/useGlobalContext'
import api from '../../../services/api'
import { useToast } from '@chakra-ui/react'


export default function Register() {

    const { setUserInfo, errorsInput, setErrorsInput } = useGlobalContext()
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState({
        nome: '',
        email: ''
    })
    const toast = useToast()

    const navigate = useNavigate()

    async function handleSubmit(e) {

        e.preventDefault()

        if (!nome || !email) {
            setErrorsInput(true)
            setErrors({
                ...errors,
                nome: !nome ? 'Campo nome é obrigatório' : '',
                email: !email ? 'Campo e-mail é obrigatório' : ''
            })
            setTimeout(() => {
                setErrors('')
                setErrorsInput(false)
            }, 3000);
            return;
        }

        try {

            const response = await api.post('/acharEmail',
                {
                    email: email
                }
            )

            if (!response.data) {
                setUserInfo({ nome, email });
                navigate('/register-password');
                return;
            }

            toast({
                description: 'E-mail já cadastrado',
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'top'
            })

        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className='main-register'>
            <Steps currentIndex={0} />

            <div className='container-right-login'>


                <form className='form-login' onSubmit={handleSubmit}>

                    <h1>Adicione seus dados</h1>
                    <Stack spacing={1} className={errorsInput && errors.nome ? 'error-inputs' : ''}>
                        <label htmlFor="email">Nome*</label>
                        <Input
                            placeholder='Digite seu nome'
                            type='text'
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />

                        {errors &&
                            <p className='error-message'>
                                {errors.nome}
                            </p>
                        }

                    </Stack>

                    <Stack spacing={1} className={errorsInput && errors.email ? 'error-inputs' : ''}>
                        <label htmlFor="email">E-mail*</label>
                        <Input
                            placeholder='Pesquisa'
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors &&
                            <p className='error-message'>
                                {errors.email}
                            </p>
                        }
                    </Stack>

                    <button type='submit'>Continuar</button>

                    <div className='register'>
                        <p>Já possui uma conta? Faça seu</p>
                        <Link to="/login">
                            <span>Login</span>
                        </Link>
                    </div>
                </form>



                <img className='step-next' src={stepNext} />

            </div >
        </div>

    )
}

