import { 
  Modal, 
  ModalOverlay, 
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  Flex
 } from "@chakra-ui/react"

 import { FiUser } from "react-icons/fi"
 import { RxScissors } from "react-icons/rx"
 import { FaMoneyBillAlt } from "react-icons/fa"
import { ScheduleItem } from "@/pages/dashboard";

 interface ModalInfoProps{
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  data: ScheduleItem;
  finishService: () => Promise<void>;
 }

export function ModalInfo({ data,finishService,isOpen,onClose,onOpen }:ModalInfoProps){
  return(
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="barber.400" color="#fff">
          <ModalHeader >Próximo</ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            <Flex alignItems="center" mb={3}>
              <FiUser size={28} color="#ffb13e" />
              <Text ml={3} fontSize="20px" fontWeight="bold" >{data?.customer}</Text>
            </Flex>
            <Flex alignItems="center" mb={3}>
              <RxScissors size={28} color="#868995" />
              <Text ml={3} fontSize="large" fontWeight="bold" >{data?.haircut.name}</Text>
            </Flex>
            <Flex alignItems="center" mb={3}>
              <FaMoneyBillAlt size={28} color="#46ef75" />
              <Text ml={3} fontSize="large" fontWeight="bold">
              {data && data.haircut && !isNaN(Number(data.haircut.price)) ? 
              Number(data.haircut.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '0,00'}
              </Text>
            </Flex>
            <ModalFooter>
              <Button bg="red" _hover={{ bg: "#e40808"}} color="white" mr={3} onClick={() => finishService()}>
                Finalizar Serviço
              </Button>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}