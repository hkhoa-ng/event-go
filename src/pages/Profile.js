import React from 'react';
import { Box, Heading, HStack, Center, Image, Flex } from '@chakra-ui/react';
import Calendar from 'react-calendar';
import '../styles/Calendar.css';

import Navbar from '../components/navbar/Navbar';

function Profile() {
  return (
    <Box bg="gray.900">
      <Navbar username={'hkhoa'} name="Khoa Nguyen" />
      <Center>
        <Box my={'3em'} position="relative">
          <Image
            borderRadius={'10px'}
            maxH="50vh"
            src="https://images5.alphacoders.com/852/852883.jpg"
          />
          <Center
            position={'absolute'}
            left={{ base: '50%', md: '0' }}
            bottom="0"
            transform={{
              base: 'translate(-50%, 55%)',
              md: 'translate(10%, 70%)',
            }}
            flexDir={{ base: 'column', md: 'row' }}
          >
            <Image
              borderRadius="50%"
              w="170px"
              src={'https://avatars2.githubusercontent.com/u/37842853?v=4'}
              border="5px solid #171923"
            />
            <Heading ml={{ base: 0, md: 7 }}>Khoa Nguyen</Heading>
          </Center>
        </Box>
      </Center>
      <Center w="100%" mt={'7rem'}>
        <HStack gap={10} flexDir={{ base: 'column', md: 'row' }} w="95%">
          <Box w={{ base: '80%', md: '60%' }}>
            <Calendar locale="en-GB" />
          </Box>
          <Box w={{ base: '50%', md: '30%' }} h="100%" bg="teal">
            <Heading>Personal</Heading>
          </Box>
          <Box w="20%" h="100%" bg="teal">
            <Heading>Personal</Heading>
          </Box>
        </HStack>
      </Center>
    </Box>
  );
}

export default Profile;
