import { Flex, Spinner } from "@chakra-ui/react";


export default function Loading() {
    return (
        <Flex justifyContent='center' alignItems='center' height='60vh'>
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='pink.500'
                size='xl'
            />
        </Flex>
    )
}