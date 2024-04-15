import { Flex, Text, FlexProps, IconButton, useColorModeValue} from "@chakra-ui/react"
import { FiMenu } from "react-icons/fi"


interface MobileProps extends FlexProps{
  onOpen: () => void;
}

export default function MobileNav({ onOpen, ...rest}: MobileProps){
  return(
    <Flex
      ml={{ base: 0, md: 60}}
      px={{ base: 4, md: 24}}
      height="20"
      alignItems="center"
      color="white"
      bg={useColorModeValue("barber.400", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("barber.900", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton 
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        border="none"
        color="white"
        _hover={{bg: 'none', color: 'red'}}
        fontSize="25"
        icon={ <FiMenu /> }
      />
      <Flex flexDirection="row" cursor="pointer">
        <Text ml={8} fontSize="25px" fontFamily="monospace" fontWeight="bold">Barber</Text>
        <Text fontSize="25px" fontFamily="monospace" fontWeight="bold" color="button.cta">PRO</Text>
      </Flex>
    </Flex>
  )
}