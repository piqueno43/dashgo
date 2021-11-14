import { Flex, Box, Text, Avatar } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}
export default function Profile({ showProfileData=true }: ProfileProps) {
  return (
    <Flex align="center">
    {showProfileData && (
      <Box mr="4" textAlign="right">
      <Text>Edivaldo Araújo da Silva</Text>
      <Text color="gray.300" fontSize="small">edivaldo@gmail.com</Text>
    </Box>
    )}
    
    <Avatar size="md" name="Edivaldo Araújo da Silva" src="https://github.com/piqueno43.png" />
  </Flex>
  )
}
