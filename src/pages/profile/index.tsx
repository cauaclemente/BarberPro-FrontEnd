import Head from "next/head";
import Link from "next/link";
import { useContext, useState } from "react";

import {
  Flex,
  Text,
  Heading,
  Box,
  Input,
  Button
} from "@chakra-ui/react";

import { Sidebar } from "@/components/sidebar";
import { canSSRAuth } from "../../../utils/canSSRAuth";
import { Authcontext } from "@/context/AuthContext";
import { setUpAPIClient } from "@/service/api";

interface ProfileProps {
  user: UserProps;
  premium: boolean;
}

interface UserProps {
  id: string;
  name: string;
  email: string;
  endereco: string | null;
}

export default function Profile({ user, premium}: ProfileProps){

  const { logoutUser } = useContext(Authcontext);

  const [name, setName] = useState(user && user?.name);
  const [endereco, setEndereco] = useState(user && user?.endereco ? user?.endereco: '');

  async function handleLogout(){
    await logoutUser();
  }

  return(
    <>
      <Head>
        <title>Minha Conta - BarberPRO</title>
      </Head>
      <Sidebar>
        <Flex direction="column" alignItems="flex-start" justifyContent="flex-start">
          <Flex direction="row" width="100%" alignItems="center" justifyContent="flex-start">
            <Heading fontSize="3xl" mt={4} mb={4} mr={4} color="orange.900">Minha Conta</Heading>
          </Flex>
          <Flex pt={8} pb={8} bg="barber.400" maxW="700" width="100%" direction="column" alignItems="center" justifyContent="center">
            <Flex direction="column" width="85%">
              <Text mb={2} fontSize="xl" fontWeight="bold" color="white">
                Nome da barbearia: 
              </Text>
              <Input 
                placeholder="Nome da sua barbearia"
                bg="gray.900"
                width="100%"
                border="1px solid gray"
                mb={3}
                size="lg"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Text mb={2} fontSize="xl" fontWeight="bold" color="white">
                Endereço: 
              </Text>
              <Input 
                placeholder="Endereço da barbearia"
                bg="gray.900"
                width="100%"
                border="1px solid gray"
                mb={3}
                size="lg"
                type="text"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
              />
              <Text mb={2} fontSize="xl" fontWeight="bold" color="white">
                Plano atual: 
              </Text>
              <Flex
                direction="row"
                width="100%"
                mb={3}
                p={1}
                border="1px solid gray"
                rounded={6}
                bg="barber.900"
                alignItems="center"
                justifyContent="space-between"
              >
              <Text p={2} fontSize="lg" color={premium ? "#fba931" : "#4dffb4"} >
                Plano {premium ? "Premium" : "Grátis"}
              </Text>
                <Link href="/planos">
                  <Box cursor="pointer" p={1} pl={2} pr={2} bg="#00cd52" rounded={4} color="white">
                    Mudar plano
                  </Box>
                </Link>
              </Flex>
              <Button
                width="100%"
                mt={3}
                mb={4}
                bg="button.cta"
                _hover={{ bg: '#ffb13e', color: "white"}} 
                
              > 
                Salvar 
              </Button>
              <Button
                width="100%"
                mb={6}
                bg="red"
                _hover={{ color: "white"}}
                onClick={handleLogout}
              >
                Sair da conta 
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  try{
    const apiClient = setUpAPIClient(ctx)
    const response = await apiClient.get('/me')

    const user = {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
      endereco: response.data?.endereco
    }

    return{
      props: {
        user: user,
        premium: response.data.subscriptions?.status === "active" ? true : false  
      }
    }

  }catch(err){
    console.log(err)
   
    return{
      redirect:{
        destination: '/dashboard',
        permanent: false
      }
    }
  }
  
})