import { Flex, SimpleGrid, Box, Text, theme } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const Chart = dynamic(()=> import("react-apexcharts"), {ssr: false});

import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

const options ={
  chart: {
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    },
    forceColor: theme.colors.gray[500],
  },
  grid: {
    show: false,    
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    enabled: false,    
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      '2021-04-18T00:00:00.000Z',
      '2021-04-19T00:00:00.000Z',
      '2021-04-20T00:00:00.000Z',
      '2021-04-21T00:00:00.000Z',
      '2021-04-22T00:00:00.000Z',
      '2021-04-23T00:00:00.000Z',
      '2021-04-24T00:00:00.000Z',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'vertical',
      shadeIntensity: 0.5,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100]
    }
  },
};
const series = [
  {
  name: 'series-1',
  data: [31, 40, 28, 51, 42, 109, 100]
  }
];

export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header/>

      <Flex w="100%" my="6" maxW={1440} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
          <Box
            p={["6", "8"]}
            bg="gray.800"
            borderRadius={8}
            pb="4"
          >
            <Text fontSize="lg" mb="4">Inscritos da semana</Text>
            <Chart
              options={options}
              series={series}
              type="area"
              height={160}
            />
          </Box>
          <Box 
            p={["6", "8"]}
            bg="gray.800" 
            borderRadius={8}
            pb="4"
            >            
            <Text fontSize="lg" mb="4">Taxa de abertura</Text>
            <Chart
              options={options}
              series={series}
              type="area"
              height={160}
            />
          </Box>         
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}

