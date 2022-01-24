import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onChangePage: (page: number) => void;
}

export default function PaginationItem({ 
  isCurrent = false,
  number,
  onChangePage
}: PaginationItemProps) {
  
  if (isCurrent) {
  return (
    <Button 
      size="sm"
      fz="xs"
      w="4"
      colorScheme="pink"
      disabled
      _disabled={{
        bg: "pink.300",
        cursor: "default",
      }}     
      >
         { number }
      </Button>
  )
  }
  return (
    <Button 
      size="sm"
      fz="xs"
      w="4"
      bgColor="gray.700"
      _hover={{
        bg: "gray.500",
      }}     
      onClick={() => onChangePage(number)}
      >
         { number}
      </Button>
  )
}
