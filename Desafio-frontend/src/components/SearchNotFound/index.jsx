import { Flex, Text, Box, Img } from "@chakra-ui/react"
import Search from "../../assets/search.svg"


export default function handleSearch() {
    return (
        <Flex flexDirection='column' alignItems='center' justifyContent='center' position='fixed' w='80%' h='50%'>
            <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'  >
                <Img src={Search} />
                <Text color='#F08889' fontSize='28px'>Nenhum resultado foi encontrado!</Text>
                <Text color='#9B9BB2' fontSize='24px'>Verifique se escrita está correta</Text>
            </Box>
        </Flex>
    )
}