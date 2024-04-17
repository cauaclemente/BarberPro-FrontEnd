import Head from "next/head";
import Link from "next/link";
import { Sidebar } from "@/components/sidebar";

import { Flex, Text, Heading, Button, Stack, Switch, useMediaQuery } from "@chakra-ui/react";

import { ChangeEvent, useState } from "react";
import { RxScissors } from "react-icons/rx";

import { canSSRAuth } from "../../../utils/canSSRAuth";
import { setUpAPIClient } from "@/service/api";

interface HaircutsItem{
  id: string;
  name: string;
  price: number | string;
  status: boolean;
  user_id: string
} 

interface HaircutsProps{
  haircuts: HaircutsItem[];
}

 
export default function Haircuts({haircuts}: HaircutsProps){

  const [isMobile] = useMediaQuery("(max-width: 640px)")

  const [haircutList, setHaircutList] = useState<HaircutsItem[]>(haircuts || [])
  const [disableHaircut, setDisableHaircut] = useState("enabled")

  async function handleDisabled(e: ChangeEvent<HTMLInputElement>){

    const apiClient = setUpAPIClient();

    if(e.target.value === 'disabled'){


      setDisableHaircut("enabled")
      const response = await apiClient.get('/haircuts', {
        params:{
          status: true
        }
      })

      setHaircutList(response.data)

    }else{

      setDisableHaircut("disabled")
      const response = await apiClient.get('/haircuts', {
        params:{
          status: false
        }
      })

      setHaircutList(response.data)

    }

  }
   
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
              <Button bg="#292934" color="#fff" _hover={{ bg: "#3a3a4a" }}>
                Cadastrar novo
              </Button>
            </Link>
            <Stack 
              ml="auto"
              mt={isMobile ? '4' : '0'}
              alignItems="center" 
              direction="row">
              <Text fontWeight="bold">ATIVOS</Text>
              <Switch 
                colorScheme="green"
                size="lg"
                value={disableHaircut}
                onChange={(e:ChangeEvent<HTMLInputElement>) => handleDisabled(e) }
                isChecked={disableHaircut === 'disabled' ? false : true}
              />
            </Stack>
          </Flex>
          {haircutList.map(haircut => (
            <Stack w="100%" >
            <Link key={haircut.id} href={`/haircuts/${haircut.id}`}  >
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
                  <Text fontWeight="bold" ml={4} noOfLines={2} color="white" fontSize={isMobile ? "15px" : "18"} >
                    {haircut.name}
                  </Text>
                </Flex>
                <Text fontWeight="bold" color="white" fontSize={isMobile ? "15px" : "18"}>
                  R$: {haircut.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </Text>
              </Flex>
            </Link>
            </Stack>
          ))}
        </Flex>
      </Sidebar>
    </>
  )
} 

export const getServerSideProps = canSSRAuth(async (ctx) => {

  try{
    const apiClient = setUpAPIClient(ctx);
    const response = await apiClient.get('/haircuts',{    
        params:{
          status: true
        }
    })

    if(response.data === null){
      return{
        redirect:{
          destination: "/dashboard",
          permanent: false
        }
      }
    }

    return{
      props:{
        haircuts: response.data
      }
    }

  }catch{
    return{
      redirect:{
        destination: "/dashboard",
        permanent: false
      }
    }
  }
})