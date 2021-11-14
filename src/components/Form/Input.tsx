import { forwardRef, ForwardRefRenderFunction } from "react";
import {FormErrorMessage, Input as ChakraInput, InputProps as ChakraInputProps,  FormLabel, FormControl } from '@chakra-ui/react'
import { FieldError } from "react-hook-form";

interface InputProps  extends ChakraInputProps {
  label?: string;
  name: string;
  error?: FieldError;
}

const InputBase:ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({
  name, 
  error=null,
  label, 
  ...rest 
  }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
    {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
    <ChakraInput
      id={name}
      name={name}      
      focusBorderColor="pink.500"
      bgColor="gray.900"
      variant="filled"
      _hover={{ bgColor: 'gray.900' }}
      placeholder={label}
      size="lg"
      ref={ref}
      {...rest}
    />
    {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
  </FormControl>  
  );
}

export const Input = forwardRef<HTMLInputElement, InputProps>(InputBase);