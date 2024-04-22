import { ChangeEvent, useState } from "react"

import Head from "next/head"
import { useRouter } from "next/router"

import { Text, Flex, Heading, Button, Input, Select } from "@chakra-ui/react"

import { Sidebar } from "@/components/sidebar"
import { canSSRAuth } from "../../../utils/canSSRAuth"
import { setUpAPIClient } from "@/service/api"

interface HaircutProps{
  id: string;
  name: string;
  price: string | number;
  status: boolean;
  user_id: string
}

interface NewProps{
  haircuts: HaircutProps[];
}

export default function New({ haircuts }: NewProps){

  const [ customer, setCustomer] = useState('')
  const [haircutSelected, setHaircutSelected] = useState(haircuts[0])

  const router = useRouter()

  function handleChangeSelected(id: string){

    const haircutItem = haircuts.find(item => item.id === id)
  
    setHaircutSelected(haircutItem)
  }

  async function handleRegister(){
    try{

      const apiClient = setUpAPIClient();
      await apiClient.post('/schedule', {
        customer: customer,
        haircut_id: haircutSelected?.id
      })

      router.push('/dashboard')

    }catch{
      alert("Erro ao registrar")
    }
  }

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
            <Select mb={3} size="lg" w="85%" bg="barber.900" borderColor="gray" onChange={(e) => handleChangeSelected(e.target.value)}>
              {haircuts.map(item => (
                <option style={{background: "#1b1c29"}} key={item?.id} value={item?.id}>{item?.name}</option>
              ))}
            </Select>
            <Button
              w="85%"
              size="lg"
              color="gray.900"
              bg="button.cta"
              _hover={{bg: "#ffb13e"}}
              onClick={handleRegister}
            >
              Cadastrar
            </Button>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async(ctx) => {
  
  try{

    const apiClient = setUpAPIClient(ctx);
    const response = await apiClient.get('/haircuts', {
      params:{
        status: true
      }
    })

    if(response.data === null){
      return{
        redirect:{
          destination: '/dashboard',
          permanent: false
        }
      }
    }

    return{
      props:{
        haircuts: response.data
      }
    }

  }catch(err){
    console.log(err);
    return{
      redirect:{
        destination: '/dashboard',
        permanent: false
      }
    }
  }
})