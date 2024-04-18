import Head from "next/head";
import Link from "next/link";

import { Flex, Text, Button, Heading, useMediaQuery, Input, Stack, Switch } from "@chakra-ui/react";

import { Sidebar } from "@/components/sidebar";
import { FiChevronLeft } from "react-icons/fi";
import { canSSRAuth } from "../../../utils/canSSRAuth";
import { setUpAPIClient } from "@/service/api";
import { ChangeEvent, useState } from "react";


interface HaircutProps{
  id: string;
  name: string;
  price: string | number;
  status: boolean;
  user_id: string;
}

interface SubscriptionProps{
  id: string;
  status: string;
}

interface EditHaircutProps{
  haircut: HaircutProps;
  subscription: SubscriptionProps | null;
}

export default function EditHaircut({subscription, haircut}: EditHaircutProps){

  const [isMobile] = useMediaQuery("(max-width: 640px)")

  const [name, setName] = useState(haircut?.name)
  const [price, setPrice] = useState(haircut?.price)
  const [status, setStatus] = useState(haircut?.status)
  const [disableHaircut, setDisableHaircut] = useState(haircut?.status ? "disabled" : "enabled")

  function handleChangeStatus(e: ChangeEvent<HTMLInputElement>){
    if(e.target.value === 'disabled'){
      setDisableHaircut('enabled');
      setStatus(false);
    }else{
      setDisableHaircut('disabled');
      setStatus(true);
    }
  }

async function handleUpdate(){

  if(name === '' || price === ''){
    alert("Preencha o campo")
    return;
  }

  try{

    const apiClient = setUpAPIClient();
    await apiClient.put('/haircut', {
      name: name,
      price: Number(price),
      status: status,
      haircut_id: haircut?.id
    })

    alert("Corte atualizado com sucesso")
    
  }catch{
    alert("Erro ao atualizar")
  }

}

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
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input 
                placeholder="Valor do corte "
                bg="gray.900"
                borderColor="gray"
                w="100%"
                mb={5}
                size="lg"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <Stack mb={6} alignItems="center" direction="row">
                <Text fontWeight="bold"> Desativar Corte </Text>
                <Switch 
                  size="lg"
                  colorScheme="red"
                  value={disableHaircut}
                  isChecked={disableHaircut === 'disabled' ? false : true}
                  onChange={( e: ChangeEvent<HTMLInputElement>) => handleChangeStatus(e)}
                />
              </Stack>
              <Button 
                mb={6} 
                w="100%" 
                bg="button.cta" 
                color="gray.900"
                 _hover={{ bg: "#ffb13e"}} 
                isDisabled={subscription?.status !== 'active'}
                onClick={handleUpdate}
              >
                Salvar
              </Button>
              {subscription?.status !== "active" && (
                <Flex direction="row" align="center" justify="center">
                  <Link href="/planos">
                    <Text cursor="pointer" fontWeight="bold" color="#31fb6a" mr={1}>
                      Seja premium
                    </Text>
                  </Link>
                    <Text>
                      e tenha todos acessos liberados.
                    </Text>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const { id } = ctx.params;

  try{
    const apiClient = setUpAPIClient(ctx);

    const check = await apiClient.get('/haircut/check');

    const response = await apiClient.get('/haircut/detail',{
      params:{
        haircut_id: id,
      }
    })

    return{
      props:{
        haircut: response.data,
        subscription: check.data?.subscriptions
      }
    }

  }catch{
    return{
      redirect:{
        destination: '/haircuts',
        permanent: false
      }
    }
  }
})