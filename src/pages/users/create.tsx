import Link from "next/link";
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from "yup";

import { 
  Box,
  Flex,
  Heading,
  Divider,
  VStack,
  SimpleGrid,
  HStack,
  Button,
} from '@chakra-ui/react';

import { useMutation } from 'react-query'
import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../../services/axios";
import { useRouter } from "next/router";
import { queryClient } from '../../services/queryClient'

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

const createUserSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().email("E-mail obrigatório").required("E-mail inválido"),
  password: yup.string().required("Senha obrigatória").min(6, "Senha deve ter no mínimo 6 caracteres"),
  passwordConfirmation: yup.string().oneOf([
    yup.ref('password')
  ], 'As senhas precisam ser iguais'),
});

export default  function CreateUser () {
  const router = useRouter()

  const createUser = useMutation(async (user: CreateUserFormData) => {
    const response = await api.post('users', {
      user: {
        ...user,
        created_at: new Date(),
      }
    })

    return response.data.user
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
      router.push('/users')
    }
  })
         
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserSchema),
  });

  const handleCreateUser:SubmitHandler<CreateUserFormData> = async (values) => {
    await createUser.mutateAsync(values);    
  }

 return (
   <Box>
     <Header/>
     <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
       <Sidebar />
       <Box
        as="form"
        flex="1"
        borderRadius={8}
        bg="gray.800"
        p={["6", "8"]}
        onSubmit={handleSubmit(handleCreateUser)}
       >
         <Heading size="lg" fontWeight="normal">Criar usuário</Heading>
         <Divider my="6" borderColor="gray.700"/>
         <VStack spacing={["6","8"]}>
            <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%">
                <Input name="name" error={errors.name} label="Nome completo" {...register("name")}/>
                <Input name="email" error={errors.email} type="email" label="E-mail" {...register("email")}/>
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%">
                <Input name="password" error={errors.password} type="password" label="Senha" {...register("password")}/>
                <Input name="passwordConfirmation" error={errors.passwordConfirmation} type="password" label="Confirmação da senha" {...register("passwordConfirmation")}/>
            </SimpleGrid>
         </VStack>
        <Flex mt="8" justify="flex-end">
          <HStack>
            <Link href="/users" passHref>
              <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
            </Link>
            <Button colorScheme="pink" type="submit" isLoading={isSubmitting}>Salvar</Button>
          </HStack>
        </Flex>
      </Box>
     </Flex>
   </Box>
 )
}