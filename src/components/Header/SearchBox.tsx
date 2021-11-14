import { Flex, Input, Icon } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { RiSearchLine } from "react-icons/ri";

export default function SearchBox() {
  // const [search, setSearch] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // debaunce
  
  return (
    <Flex
    as="label"
    htmlFor="search-box"
    flex="1"
    py="4"
    px="8"
    ml="6"
    maxW={400}
    alignSelf="center"
    color="gray.200"
    position="relative"
    bg="gray.800"
    borderRadius="full"
    >
      <Input
        id="search-box"
        color="gray.50"
        variant="unstyled"
        px="4"
        mr="4"
        placeholder="Search in platform"
        _placeholder={{
          color: "gray.400",
        }}        
        ref={searchInputRef}        
      />
      <Icon as={RiSearchLine} fontSize="20" />
    </Flex>
  )
}
