import Head from "next/head"
import Image from "next/image"
import Link from "next/link"

import { Flex, Text, Center, Input, Button } from "@chakra-ui/react"

import logoImg from "../../../public/images/logo.svg"

export default function Register(){
  return(
    <>
      <Head>
        <title> Cria sua conta no BarberPRO </title>
      </Head>
      <Flex background="barber.900" height="100vh" alignItems="center" justifyContent="center">

        <Flex width={640} direction="column" p={14} rounded={8}>
          <Center p={4}>
          <Image 
            src={logoImg}
            quality={100}
            width={240}
            objectFit="fill"
            alt="Logo barberpro"
          />  
          </Center>
          <Input
            background="barber.400"
            color="#fff"
            variant="filled"
            size="lg"
            mb={4}
            _hover={{bg: "barber.400"}}
            placeholder="Nome da barbearia"
            type="text"
          />
          <Input
            background="barber.400"
            color="#fff"
            variant="filled"
            size="lg"
            mb={4}
            _hover={{bg: "barber.400"}}
            placeholder="email@email.com"
            type="email"
          />
          <Input
            background="barber.400"
            color="#fff"
            variant="filled"
            size="lg"
            mb={6}
            _hover={{bg: "barber.400"}}
            placeholder="******"
            type="password"
          />
          <Button
            background="button.cta"
            mb={6}
            color="gray.900"
            size="lg"
            _hover={{ bg: "#ffb13e"}}
          >
            Cadastrar
          </Button>
          <Center mt={2}>
            <Link href="/login">
              <Text color="#fff" cursor="pointer"> Já possui uma conta? <strong color="#000">Faça login</strong></Text>
            </Link>
          </Center>
        </Flex>
      </Flex>
    </>
  )
}