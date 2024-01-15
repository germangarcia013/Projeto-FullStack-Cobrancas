import './styles.css'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogOverlay,
    Flex,
    Text,
    Button
} from '@chakra-ui/react'
import { useRef } from 'react'
import AlerteDelete from '../../../assets/alert-delete.svg'
import api from '../../../services/api'
import useGlobalContext from '../../../hooks/useGlobalContext'
import { useToast } from '@chakra-ui/react'

export default function AlertDelete({ onClose, isOpen, chargeId }) {
    const { token, setAddTransactionCharge, setCobrancaCliente } = useGlobalContext()
    const cancelRef = useRef()
    const toast = useToast()


    async function handleDeleteCharge() {
        try {
            await api.delete(`/cobranca/deletar/${chargeId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const response = await api.get('/cobrancas',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

            const { cobrancas } = response.data

            onClose()
            setAddTransactionCharge(cobrancas)
            setCobrancaCliente(cobrancas)

            toast({
                description: 'Cobrança excluida com sucesso!',
                status: 'success',
                duration: 4000,
                isClosable: true,
                position: 'bottom-right'
            })


        } catch (error) {
            if (error.response) {
                toast({
                    description: error.response.data.message || error.response.data,
                    status: 'warning',
                    duration: 4000,
                    isClosable: true,
                    position: 'bottom-right'
                })
            }
        }
    }


    return (
        <Flex >
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isCentered
            >
                <AlertDialogOverlay>
                    <AlertDialogContent height='30%' borderRadius='20px' >
                        <AlertDialogBody display='flex' flexDirection='column' alignItems='center' justifyContent='center' gap='15px'>
                            <img src={AlerteDelete} className='icon-alert' />
                            <Text color='#CC7800' fontSize='18px' fontWeight='500'>Tem certeza que deseja excluir esta cobrança?</Text>
                            <Flex gap='20px'>
                                <Button bg='#F2D6D0' color='#AE1100' h='25px' width='100px'
                                    onClick={onClose}
                                >
                                    Não
                                </Button>
                                <Button bg='#ACD9C5' color='#034A2A' h='25px' width='100px'
                                    onClick={handleDeleteCharge}
                                >
                                    Sim
                                </Button>
                            </Flex>
                        </AlertDialogBody>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Flex >
    )
}