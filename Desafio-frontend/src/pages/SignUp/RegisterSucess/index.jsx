import "./styles.css"
import Steps from "../../../components/Steps"
import iconSucess from "../../../assets/icon-sucess.svg"
import { useNavigate } from "react-router-dom"

export default function RegisterSucess() {

    const navigate = useNavigate()

    return (
        <div className='main-register'>
            <Steps currentIndex={3} />
            <div className='container-right-login'>
                <div className="container-sucess">
                    <img src={iconSucess} />
                    <p>Cadastro realizado com sucesso!</p>
                </div>

                <button onClick={() => navigate('/login')} >Ir para Login</button>
            </div>
        </div>
    )
}