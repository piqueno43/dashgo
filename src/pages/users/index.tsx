import Link from "next/link";

import { Box,
   Flex,
   Heading,
   Button,
   Icon,
   Table,
   Thead,
   Tbody,
   Tr,
   Th,
   Td,
   Checkbox,
   Text,
   useBreakpointValue,
} from '@chakra-ui/react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';

import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';

export default function UserList () {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  return (
    <Box>
      <Header/>

      <Flex w="100%" my="6" maxW={1480} mx="auto" px={["4", "4", "6"]}>
        <Sidebar />

        <Box
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p="8"
        >
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">Usuários</Heading>
            <Link href="/users/create" passHref>
            <Button
              size="lg"
              fontSize="sm"
              fontWeight="normal"
              colorScheme="pink"
              leftIcon={<Icon as={RiAddLine} />}
              fz="20"
            >
              Criar novo usuário
            </Button>
            </Link>
          </Flex>   
      <Table colorScheme="whiteAlpha">
        <Thead>
          <Tr>
            <Th px={["4", "4", "6"]}  color="gray.300" w="8">
              <Checkbox colorScheme="pink"/>
            </Th>
            <Th>
              Usuário
            </Th>
            {isWideVersion &&  <Th>Data de cadastro</Th>}           
            <Th w="6"/>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td px={["4", "4", "6"]}>
              <Checkbox colorScheme="pink"/>
            </Td>
            <Td>
              <Box>
                <Text>Edivaldo Silva</Text>
                <Text fontSize="sm">edivalo.silva@email.com</Text>
              </Box>
            </Td>
            { isWideVersion &&<Td>04 de Novembro, 2021</Td>}            
            <Td w="16">
              <Button
                size="sm"
                fontSize="sm"
                fontWeight="normal"
                colorScheme="purple"
                leftIcon={<Icon as={RiPencilLine} />}
                fz="16"
              >
             Editar
            </Button>
            </Td>
          </Tr>            
        </Tbody>

      </Table>
      <Pagination/>
      </Box>
      </Flex>
    </Box>
  )
}

