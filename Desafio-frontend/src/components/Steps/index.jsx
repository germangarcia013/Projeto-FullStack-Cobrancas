import { Flex, Box } from '@chakra-ui/react'
import './styles.css'
import {
    Step,
    StepDescription,
    StepIndicator,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
} from '@chakra-ui/react'
import StepActive from "../../assets/step-active.svg"
import StepComplete from "../../assets/step-complete.svg"
import StepIncomplete from "../../assets/step-incomplete.svg"

const StepIconActive = () => <img src={StepActive} />;
const StepIconComplete = () => <img src={StepComplete} />;
const StepIconIncomplete = () => <img src={StepIncomplete} />;

const steps = [
    { title: 'Cadastre-se', description: 'Por favor, Escreva seu nome e e-mail' },
    { title: 'Escolha uma senha', description: 'Escolha uma senha segura' },
    { title: 'Cadastro realizado com sucesso', description: 'E-mail e senha cadastrados com sucesso' },
]

export default function Steps({ currentIndex }) {
    const { activeStep } = useSteps({
        index: currentIndex,
        count: steps.length,
    })

    return (
        <Flex h="100vh" paddingTop="170px" justifyContent="center" w="540px" backgroundColor="#F0F0F5">
            <Stepper index={activeStep} orientation='vertical' height='200px' gap='0'  >
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepIndicator border="none">
                            <StepStatus
                                complete={<StepIconComplete />}
                                incomplete={<StepIconIncomplete />}
                                active={<StepIconActive />}
                            />
                        </StepIndicator>

                        <Box flexShrink='0' fontWeight="500" >
                            <StepTitle className='step-title' style={{ fontSize: '18px', fontWeight: 'bold' }}>{step.title}</StepTitle>
                            <StepDescription className='step-description' style={{ fontSize: '15px' }}>{step.description}</StepDescription>
                        </Box>

                        <StepSeparator border="2px green solid" />
                    </Step>
                ))}
            </Stepper>
        </Flex>
    )
}

