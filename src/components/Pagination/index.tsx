import { Stack, Button, Box, Text} from "@chakra-ui/react";
import PaginationItem from "./PaginationItem";

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onChangePage: (page: number) => void;
}

const siblingsCount = 2;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter(page => page > 0);
}

export function Pagination ({ 
  totalCountOfRegisters, 
  registersPerPage = 10,
  currentPage = 1,
  onChangePage
}: PaginationProps) {
  const lastPage = Math.floor(totalCountOfRegisters / registersPerPage);

  const previousPage = currentPage > 1
    ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
    : [];

  const nextPage = currentPage < lastPage
  ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
  : [];

  const indexOfRegistersPerPage = currentPage * registersPerPage;
  const indexOfFirstRegister = indexOfRegistersPerPage - registersPerPage;

  return (
    <Stack 
      direction={["column", "row"]}
      mt="8"
      justify="space-between"
      align="center"
      spacing="6"
    >
       <Box>
         <strong>{indexOfFirstRegister}</strong> - <strong>{indexOfRegistersPerPage}</strong> de <strong>{totalCountOfRegisters}</strong>
        </Box>
     <Stack direction="row" spacing="2">
        {currentPage > (1 + siblingsCount) && (
          <>
          <PaginationItem onChangePage={onChangePage} number={1}/>
          {currentPage > (2 + siblingsCount) && (
            <Text color="gray.300" w="8" textAlign="center">...</Text>
          )}
          </>
        )}

        {previousPage.length > 0 && previousPage.map(page => (
         <PaginationItem onChangePage={onChangePage} key={page} number={page}/>
        ))}

        <PaginationItem onChangePage={onChangePage} number={currentPage}  isCurrent/>      
       
       {nextPage.length > 0 && nextPage.map(page => (
          <PaginationItem onChangePage={onChangePage} key={page} number={page} />
        ))}  

        {currentPage + siblingsCount < lastPage && (
         <>
          {currentPage + 1 + siblingsCount < lastPage && (
            <Text color="gray.300" w="8" textAlign="center">...</Text>
          )}
          <PaginationItem onChangePage={onChangePage} number={lastPage}/>          
         </>
        )}   
      </Stack>      
    </Stack>
  )
}