import { HStack, Icon } from "@chakra-ui/react";
import { RiNotificationLine, RiUserAddLine } from "react-icons/ri";

export default function NotificationsNav() {
  return (
    <HStack
      spacing={["6","8"]}
      mx={["6","8"]}
      pr={["6","8"]}
      py="1"
      borderRightWidth="1px"
      borderRightColor="gray.700"
    >
      <Icon as={RiNotificationLine} fontSize="20" />
      <Icon as={RiUserAddLine} fontSize="20" />
    </HStack>
  )
}
