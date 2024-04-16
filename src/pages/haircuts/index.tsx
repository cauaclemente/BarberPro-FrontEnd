import Head from "next/head";
import { Sidebar } from "@/components/sidebar";
import Link from "next/link";

import { Flex, Text, Heading, Button, Stack, Switch, useMediaQuery } from "@chakra-ui/react";

import { IoMdPricetag } from "react-icons/io";
import { RxScissors } from "react-icons/rx";

 
export default function Haircuts(){

  const [isMobile] = useMediaQuery("(max-width: 640px)")
   
  return(
    <>
      <Head>
        <title>Modelos de corte - Minha barbearia </title>
      </Head>
      <Sidebar>
        <Flex direction="column" alignItems="flex-start" justifyContent="flex-start">
          <Flex
            direction={isMobile ? 'column' : 'row'}
            w="100%"
            alignItems={isMobile ? 'flex-start' : 'center'}
            justifyContent="flex-start"
            mb={0}
          >
            <Heading
              fontSize={isMobile ? '25px' : '3xl'}
              mt={4}
              mb={4}
              mr={4}
              color="orange.900"
            >
              Modelos de cortes
            </Heading>
            <Link href="/haircuts/new">
              <Button>
                Cadastrar novo
              </Button>
            </Link>
            <Stack 
              ml={isMobile ? '0' : 'auto'}
              mt={isMobile ? '4' : '0'}
              alignItems="center" 
              direction="row">
              <Text fontWeight="bold">ATIVOS</Text>
              <Switch 
                colorScheme="green"
                size="lg"
              />
            </Stack>
          </Flex>
          <Stack w="100%" >
          <Link href="/haircuts/123"  >
            <Flex
              cursor="pointer"
              p={4}
              bg="barber.400"
              direction="row"
              rounded="4"
              color="white"
              justifyContent="space-between"
              mb={2}
              mt={4}
            >
              <Flex direction="row" alignItems="center" justifyContent="center">
                <RxScissors size={28} color="#fba931" />
                <Text fontWeight="bold" ml={4} noOfLines={2} color="white">
                  Corte completo
                </Text>
              </Flex>
              <Text fontWeight="bold" color="white">
                Preço: R$: 59.90
              </Text>
            </Flex>
          </Link>
          </Stack>
        </Flex>
      </Sidebar>
    </>
  )
} 