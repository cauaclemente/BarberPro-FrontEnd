import Head from "next/head";
import Link from "next/link";

import { Sidebar } from "@/components/sidebar";
import { Flex, Text, Heading, Button, useMediaQuery, Input } from "@chakra-ui/react";

import { FiChevronLeft } from "react-icons/fi";
import { canSSRAuth } from "../../../../utils/canSSRAuth";
import { setUpAPIClient } from "@/service/api";

interface NewHaircutProps{
  subscription: boolean;
  count: number
}

export default function NewHaircut({ subscription, count}: NewHaircutProps){

  const [isMobile] = useMediaQuery("(max-width: 640px)")

  return(
    <>
      <Head>
        <title>BarberPRO - Novo modelo de corte</title>
      </Head>
      <Sidebar>
        <Flex direction="column" alignItems="flex-start" justifyContent="flex-start">
          <Flex
          direction={isMobile ?  "column" : "row"}
          w="100%"
          alignItems={isMobile ? "flex-start" : "center"}
          mb={ isMobile ? 4 : 0}
          >
            <Link href="/haircuts">
              <Button
                p={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
                mr={4}
                bg="#292934"
                _hover={{ bg: "#3a3a4a" }}
                color="#fff"
              >
                <FiChevronLeft size={24} color="#fff" />
                  Voltar
              </Button>
            </Link>
            <Heading color="orange.900" mt={4} mb={4} mr={4} fontSize={isMobile ? "28px" : "3xl"}>
              Modelos de corte
            </Heading>
          </Flex>
          <Flex
            maxW="700px"
            bg="barber.400"
            w="100%"
            alignItems="center"
            justifyContent="center"
            direction="column"
            pt={8}
            pb={8}
          >
            <Heading mb={4} fontSize={isMobile ? "22px" : "3xl"} color="#fff">Cadastrar modelo</Heading>
            <Input
              placeholder="Nome do corte"
              size="lg"
              type="text"
              w="85%"
              bg="gray.900" 
              borderColor="gray"
              mb={3}
            />
            <Input
              placeholder="Valor do Corte ex: 34.99"
              size="lg"
              type="text"
              w="85%"
              bg="gray.900" 
              borderColor="gray"
              mb={4}
            />
            <Button
              w="85%"
              size="lg"
              color="gray.900"
              mb={6}
              bg="button.cta"
              _hover={{ bg: "#ffb13e", color: "#fff" }}
              isDisabled={!subscription && count >= 3}
            >
              Cadastrar
            </Button>
            {!subscription && count >= 3 && (
              <Flex direction="row" alignItems="center" justifyContent="center">
                <Text>
                  Você atingiou o limite de corte.
                </Text>
                <Link href="/planos">
                  <Text fontWeight="bold" color="#31fb6a" cursor="pointer" ml={1}>
                    Seja premium
                  </Text>
                </Link>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Sidebar>  
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  try{
    const apiClient = setUpAPIClient(ctx)

    const response = await apiClient.get('/haircut/check');
    const count = await apiClient.get('haircut/count');

    return {
      props:{
        subscription: response.data?.subscriptions?.status === "active" ? true : false,
        count: count.data
      }
    }

  }catch(err){
    console.log(err)

    return{
      redirect:{
        destination: "/dashboard",
        permanent: false
      }
    }
  }
})