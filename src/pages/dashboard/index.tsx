import Head from "next/head";
import Link from "next/link";

import { Flex, Text, Button, Heading, Link as ChakraLInk, useMediaQuery} from "@chakra-ui/react";

import { canSSRAuth } from "../../../utils/canSSRAuth";
import { Sidebar } from "@/components/sidebar";

import { IoMdPerson } from "react-icons/io";

export default function Dashboard(){

  const [isMobile] = useMediaQuery("(max-width: 640px)")

  return(
    <>
      <Head>
        <title>BarberPRO - Minha barbearia</title>
      </Head>
      <Sidebar>
        <Flex direction="column" alignItems="flex-start" justifyContent="flex-start">
          <Flex w="100%" direction="row" alignItems="center" justifyContent="flex-start">
            <Heading fontSize="3xl" mt={4} mb={4} mr={4}>
              Agenda
            </Heading>
            <Link href="/new">
            <Button bg="#292934" color="#fff" _hover={{ bg: "#3a3a4a" }}>
              Registrar
            </Button>
            </Link>
          </Flex>
          <ChakraLInk w="100%" mr={0} p={0} mt={1} bg="transparent" style={{ textDecoration: "none"}}>
          <Flex 
            w="100%"
            direction={isMobile ? "column" : "row"}
            p={4}
            rounded={4}
            mb={4}
            bg="barber.400"
            justify="space-between"
            align={isMobile ? "flex-start" : "center"}
            >
              <Flex direction="row" mb={isMobile ? 2 : 0} align="center" justify="center">
                <IoMdPerson size={28} color="#fba931" />
                <Text fontWeight="bold" ml={4} noOfLines={1}>Cauã clemente </Text>
              </Flex>

              <Text fontWeight="bold" mb={isMobile ? 2 : 0}>Corte simples </Text>
              <Text fontWeight="bold" mb={isMobile ? 2 : 0}>R$ 35</Text>
            </Flex>
          </ChakraLInk>
        </Flex>
      </Sidebar>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  return {
    props: {

    }
  }
})
