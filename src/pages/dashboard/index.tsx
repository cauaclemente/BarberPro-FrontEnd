import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

import { Flex, Text, Button, Heading, Link as ChakraLink, useMediaQuery, useDisclosure} from "@chakra-ui/react";

import { IoMdPerson } from "react-icons/io";

import { canSSRAuth } from "../../../utils/canSSRAuth";
import { Sidebar } from "@/components/sidebar";
import { setUpAPIClient } from "@/service/api";
import { ModalInfo } from "@/components/modal";

export interface ScheduleItem{
  id: string;
  customer: string;
  haircut:{
    id: string;
    name: string;
    price: string;
    user_id: string;
  }
}

interface DashboardProps{
  schedule: ScheduleItem[]
}

export default function Dashboard({ schedule }: DashboardProps){
  const [list, setList] = useState(schedule)
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [service, setService] = useState<ScheduleItem>()

  const [isMobile] = useMediaQuery("(max-width: 640px)")

  function handleOpenModal(item: ScheduleItem){
   setService(item);
   onOpen();
  }

  async function handleFinish(id: string){
    try{
      const apiClient = setUpAPIClient();
      await apiClient.delete('/schedule',{
        params:{
          schedule_id: id
        }
      })

      const filterItem = list.filter(item => {
        return(item?.id !== id)
      })

      setList(filterItem)
      onClose();

    }catch{
      onClose();
      alert("Erro ao finalizar esse serviço");
    }
  }

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
          {list.map(item => (
            <ChakraLink 
              key={item?.id} 
              w="100%" mr={0} 
              p={0} mt={1} 
              bg="transparent" 
              style={{ textDecoration: "none"}} 
              onClick={() => handleOpenModal(item)}>
            <Flex 
              w="100%"
              direction={isMobile ? "column" : "row"}
              p={4}
              rounded={4}
              mb={2}
              bg="barber.400"
              justify="space-between"
              align={isMobile ? "flex-start" : "center"}
              >
                <Flex direction="row" mb={isMobile ? 2 : 0} alignItems="center" justifyContent="center">
                  <IoMdPerson size={28} color="#fba931" />
                  <Text fontWeight="bold" ml={4} noOfLines={1}>{item?.customer}</Text>
                </Flex>
                <Text fontWeight="bold" mb={isMobile ? 2 : 0} alignItems="flex-start">{item?.haircut?.name}</Text>
                <Text fontWeight="bold" mb={isMobile ? 2 : 0}> 
                {item && item.haircut && !isNaN(Number(item.haircut.price)) ? 
                Number(item.haircut.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '0,00'}
                </Text>
              </Flex>
            </ChakraLink>
          ))}
        </Flex>
      </Sidebar>
      <ModalInfo 
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        data={service}
        finishService={() => handleFinish(service?.id)}
      />
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  try{
    const apiClient = setUpAPIClient(ctx);
    const response = await apiClient.get('/schedule')

    return{
      props:{
        schedule: response.data,
      }
    }

  }catch(err){
    console.log(err);
    return{
      props:{
        schedule:[]
      }
    }
  }
})
