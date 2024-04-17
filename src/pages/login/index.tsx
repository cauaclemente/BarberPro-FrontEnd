import Head from "next/head"
import Image from "next/image"
import Link from "next/link"

import { Flex, Text, Center, Input, Button } from "@chakra-ui/react"
import { useContext, useState } from "react"

import { Authcontext } from "@/context/AuthContext"
import logoImg from "../../../public/images/logo.svg"
import { canSRRGuest } from "../../../utils/canSSRGuest"


export default function Login(){
  const { sigIn } = useContext(Authcontext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(){

    if(email === '' || password === ''){
      alert("Preencha todos os campos")
      return;
    }

    await sigIn({
      email,
      password
    })
  }

  return(
    <>
      <Head>
        <title>BarberPRO - Faça login para acessar </title>
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
            placeholder="email@email.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            background="button.cta"
            mb={6}
            color="gray.900"
            size="lg"
            _hover={{ bg: "#ffb13e"}}
            onClick={handleLogin}
          >
            Acessar
          </Button>
          <Center mt={2}>
            <Link href="/register">
              <Text color="#fff" cursor="pointer"> Ainda não possui uma conta? <strong color="#000">Cadastre-se</strong></Text>
            </Link>
          </Center>
        </Flex>
      </Flex>
    </>
  )
}

export const getServerSideProps = canSRRGuest(async (ctx) => {

  return{
    props: {}
  }
})