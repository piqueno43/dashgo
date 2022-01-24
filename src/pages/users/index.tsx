import NextLink from "next/link";

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
   Spinner,
   Link,
} from '@chakra-ui/react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';

import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';
import { getUsers, useUsers } from "../../services/hooks/useUsers";
import { useState } from "react";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/axios";
import { GetServerSideProps } from "next";

export default function UserList ({ users }) {
  const [page, setPage] = useState(1);
  
  const { data, isLoading, isFetching, error } = useUsers(page, {
    initialData: users,    
  });
  
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    }, {
      staleTime: 1000 * 60 * 10, // 10 minutes
    });
  }

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
            <Heading size="lg" fontWeight="normal">Usuários {!isLoading && isFetching && <Spinner size="sm" color="gray.500"  ml="4"/>}</Heading>
            <NextLink href="/users/create" passHref>
            <Button
              size="sm"
              fontSize="sm"
              fontWeight="normal"
              colorScheme="pink"
              leftIcon={<Icon as={RiAddLine} />}
              fz="20"
            >
              Criar novo usuário
            </Button>
            </NextLink>
          </Flex>   
        { isLoading ? (
          <Flex justify="center">
            <Spinner />
          </Flex>
        ): error ? (
          <Flex justify="center">
            <Text>Falha ao obter os dados do usuário</Text>
          </Flex>
        ) : (
          <>
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
              {data.users.map(user => (
                <Tr key={user.id}>
                <Td px={["4", "4", "6"]}>
                  <Checkbox colorScheme="pink"/>
                </Td>
                <Td>
                  <Box>
                   <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                      <Text>{user.name}</Text>
                    </Link>
                    <Text fontSize="sm">{user.email}</Text>
                  </Box>
                </Td>
                { isWideVersion &&<Td>{user.createdAt}</Td>}            
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
              ))}          
              </Tbody>
            </Table>
            <Pagination
              totalCountOfRegisters={data.totalCount}
              currentPage={page}
              onChangePage={setPage}
            />
          </>
        )}
      </Box>
      </Flex>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { users, totalCount } = await getUsers(1);

  return {
    props: {
      users,    
      totalCount,
    },
  };
};