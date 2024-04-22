import { ChangeEvent, useState } from "react"

import Head from "next/head"

import { Text, Flex, Heading, Button, Input, Select } from "@chakra-ui/react"

import { Sidebar } from "@/components/sidebar"

export default function New(){

  const [ customer, setCustomer] = useState('')

  return(
    <>
      <Head>
        <title>BarberPRO - Novo agendamento </title>
      </Head>
      <Sidebar>
        <Flex direction="column" alignItems="flex-start" justifyContent="flex-start">
          <Flex direction="row" w="100%" alignItems="center" justifyContent="flex-start">
            <Heading fontSize="3xl" mt={4} mb={4} mr={4}>
              Novo Corte
            </Heading>
          </Flex>
          <Flex maxW="700px" pt={8} pb={8} w="100%" direction="column" justifyContent="center" alignItems="center" bg="barber.400">
            <Input
              placeholder="Nome do cliente"
              w="85%"
              mb={3}
              size="lg"
              bg="barber.900"
              borderColor="gray"
              type="text"
              value={customer}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCustomer(e.target.value)}
            />
            <Select mb={3} size="lg" w="85%" bg="barber.900" borderColor="gray">
              <option key={1} value="Barba completa">Barba completa</option>
            </Select>
            <Button
              w="85%"
              size="lg"
              color="gray.900"
              bg="button.cta"
              _hover={{bg: "#ffb13e"}}
            >
              Cadastrar
            </Button>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  )
}