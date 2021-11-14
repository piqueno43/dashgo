import { createContext, useContext, useEffect } from "react";
import { useRouter } from 'next/router';
import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";

interface SidebarDrawerProviderContext { 
  children: React.ReactNode;
}

type SidebarDrawerProviderContextData = UseDisclosureReturn;

const SidebarDrawerContext = createContext({} as SidebarDrawerProviderContextData);

export function SidebarDrawerProvider({ children } : SidebarDrawerProviderContext ) {
  const disclosure = useDisclosure();
  const router = useRouter();

  useEffect(()=>{
    disclosure.onClose();
  }, [router.asPath]);

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  );
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext);
