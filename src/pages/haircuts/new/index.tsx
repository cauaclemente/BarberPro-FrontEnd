import Head from "next/head";
import Link from "next/link";

import { Sidebar } from "@/components/sidebar";
import { Flex, Text, Heading, Button, useMediaQuery, Input } from "@chakra-ui/react";

import { FiChevronLeft } from "react-icons/fi";

export default function NewHaircut(){

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
            >
              Cadastrar
            </Button>
          </Flex>
        </Flex>
      </Sidebar>  
    </>
  )
}