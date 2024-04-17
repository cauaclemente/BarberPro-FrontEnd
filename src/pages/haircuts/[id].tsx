import Head from "next/head";
import Link from "next/link";

import { Flex, Text, Button, Heading, useMediaQuery, Input, Stack, Switch } from "@chakra-ui/react";

import { Sidebar } from "@/components/sidebar";
import { FiChevronLeft } from "react-icons/fi";


export default function EditHaircut(){

  const [isMobile] = useMediaQuery("(max-width: 640px)")

  return(
    <>
      <Head>
        <title>Editando modelo de corte - BarberPRO</title>
      </Head>
      <Sidebar>
        <Flex direction="column" alignItems="flex-start" justifyContent="flex-start">
          <Flex
            direction={isMobile ? "column" : "row"}
            w="100%"
            alignItems={isMobile ? "flex-start" : "center"}
            justifyContent="flex-start"
            mb={isMobile ? 4 : 0}
          >
          <Link href="/haircuts">
              <Button
                p={4}
                mr={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg="#292934"
                _hover={{ bg: "#3a3a4a" }}
                color="#fff"
              >
              <FiChevronLeft size={24} color="#fff" />
                Voltar
              </Button>
            </Link>
            <Heading fontSize={isMobile ? "22px" : "3xl"} color="white">
              Editar corte
            </Heading>
          </Flex>
          <Flex maxW="700px" w="100%" mt={4} pt={8} pb={8} bg="barber.400" direction="column" alignItems="center" justifyContent="center">
            <Heading fontSize={isMobile ? "22px" : "3xl"}>Editar corte</Heading>
            <Flex w="85%" direction="column">
              <Input 
                placeholder="Nome do corte"
                bg="gray.900"
                borderColor="gray"
                w="100%"
                mt={5}
                mb={3}
                size="lg"
                type="text"

              />
              <Input 
                placeholder="Valor do corte "
                bg="gray.900"
                borderColor="gray"
                w="100%"
                mb={5}
                size="lg"
                type="number"

              />
              <Stack mb={6} alignItems="center" direction="row">
                <Text fontWeight="bold"> Desativar Corte </Text>
                <Switch 
                  size="lg"
                  colorScheme="red"
                />
              </Stack>
              <Button mb={6} w="100%" bg="button.cta" color="gray.900" _hover={{ bg: "#ffb13e"}}>
                Salvar
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  )
}