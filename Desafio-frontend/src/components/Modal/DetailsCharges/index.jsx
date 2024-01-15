import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    Text,
    Box,
    Flex,
    Image
} from '@chakra-ui/react'

import IconCobranca from '../../../assets/icon-cobrancas.svg'
import { formatToDate } from '../../../utils/formatters'

export default function DetailsCharges({ isOpen, onOpen, onClose, nome, descricao, vencimento, valor, idCobranca, status }) {

    return (
        <>
            <Modal
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <ModalOverlay />
                <ModalContent borderRadius='20px'>
                    <ModalCloseButton />
                    <ModalBody display='flex' flexDirection='column' padding='30px 40px 30px 40px' gap='15px'>

                        <Flex alignItems='center' gap='10px'>
                            <Image src={IconCobranca} h='32px' />
                            <Text fontSize='26px' fontWeight='500'>
                                Detalhe da Cobrança
                            </Text>
                        </Flex>

                        <Box gap='10px'>
                            <Text fontSize='16px' fontWeight='bold'>
                                Nome
                            </Text>
                            <Text>{nome}</Text>
                        </Box>

                        <Box gap='10px' >
                            <Text fontSize='16px' fontWeight='bold'>
                                Descrição
                            </Text>
                            <Text h='50px'>{descricao}</Text>
                        </Box>

                        <Flex gap='50px'>
                            <Box w='50%'>
                                <Text fontSize='16px' fontWeight='bold'>
                                    Vencimento
                                </Text>
                                <Text>{formatToDate(vencimento)}</Text>
                            </Box>
                            <Box >
                                <Text fontSize='16px' fontWeight='bold'>
                                    Valor
                                </Text>
                                <Text>{valor}</Text>
                            </Box>
                        </Flex>

                        <Flex gap='50px'>
                            <Flex w='50%' flexDirection='column' gap='5px' >
                                <Text fontSize='16px' fontWeight='bold'>
                                    ID cobrancas
                                </Text>
                                <Text>{idCobranca}</Text>
                            </Flex>

                            <Flex flexDirection='column' gap='5px' >
                                <Text fontSize='16px' fontWeight='bold'>
                                    Status
                                </Text>
                                <Text className={
                                    status === 'vencida' && 'status-venc' ||
                                    status === 'paga' && 'status-paga' ||
                                    status === 'pendente' && 'status-prev'
                                }
                                >
                                    {status}
                                </Text>
                            </Flex>
                        </Flex>

                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}