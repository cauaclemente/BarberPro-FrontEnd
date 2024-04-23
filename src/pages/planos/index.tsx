import Head from "next/head";

import { 
  Text,
  Button,
  Flex,
  useMediaQuery,
  Heading
 } from "@chakra-ui/react";

 import { Sidebar } from "@/components/sidebar";
import { canSSRAuth } from "../../../utils/canSSRAuth";
import { setUpAPIClient } from "@/service/api";

interface PlanosProps{
  premium: boolean;
}

 export default function Planos({ premium }: PlanosProps){

  const [isMobile] = useMediaQuery('(max-width: 640px)')

  return(
    <>
      <Head>
        <title>BarberPRO - Sua assinatura Premium</title>
      </Head>
      <Sidebar>
        <Flex direction="column" alignItems="flex-start" justifyContent="center">
          <Heading fontSize="3xl" color="white" mt={4} mb={4} mr={4}>
            Planos
          </Heading>
        </Flex>
        <Flex pb={8} maxW="780px" w="100%" direction="column" alignItems="flex-start" justifyContent="flex-start">
          <Flex gap={4} w="100%" direction={ isMobile ? "column" : "row"}>

            <Flex rounded={4} p={2} flex={1} bg="barber.400" direction="column">
              <Heading textAlign="center" fontSize="2xl" mt={2} mb={4} color="gray.100">
                Plano Grátis
              </Heading>
              <Text fontWeight="medium" ml={4} mb={2}>Registrar cortes.</Text>
              <Text fontWeight="medium" ml={4} mb={2}>Criar apenas 3 modelos de cortes.</Text>
              <Text fontWeight="medium" ml={4} mb={2}>Editar dados do perfil.</Text>
            </Flex>

            <Flex rounded={4} p={2} flex={1} bg="barber.400" direction="column">
              <Heading textAlign="center" fontSize="2xl" mt={2} mb={4} color="#31fb6a">
                Premium
              </Heading>
              <Text fontWeight="medium" ml={4} mb={2}>Registrar cortes ilimitados.</Text>
              <Text fontWeight="medium" ml={4} mb={2}>Criar modelos ilimitados.</Text>
              <Text fontWeight="medium" ml={4} mb={2}>Editar dados do perfil.</Text>
              <Text fontWeight="medium" ml={4} mb={2}>Editar modelos de cortes.</Text>
              <Text fontWeight="medium" ml={4} mb={2}>Receber todas as atualizações.</Text>
              <Text fontWeight="bold" color="#31fb6a" fontSize="2xl" ml={4} mb={2}>R$ 14.99</Text>
              <Button 
                bg="#ff9900"
                color="#000" 
                _hover={{ bg: 'button.cta', transition: "1s all"}} 
                m={2}  
                isDisabled={premium}
                onClick={() => {}}>
              {premium ? (
                "VOCÊ JÁ É PREMIUM"
              ): (
                "VIRAR PREMIUM"
              )}
              </Button>
              {premium && (
                <Button m={2} bg="white" color="black" _hover={{ bg: "#eee8e8" }} fontWeight="bold" onClick={() => {}}>
                  ALTERAR ASSINATURA
                </Button>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  )
 }

 export const getServerSideProps = canSSRAuth(async(ctx) => {
  
  try{
    const apiClient = setUpAPIClient(ctx);
    const response = await apiClient.get("/me")

    return{
      props:{
        premium: response.data?.subscriptions?.status === 'active' ? true : false
      }
    }

  }catch{
    return{
      redirect:{
        destination: '/dashboard',
        permanent: false
      }
    }
  }
 })