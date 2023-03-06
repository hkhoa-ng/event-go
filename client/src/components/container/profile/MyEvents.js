import React from 'react';
import { Box, VStack, Heading, Text, Flex, Spacer } from '@chakra-ui/react';
import Calendar from 'react-calendar';

function MyEvents() {
  return (
    <Flex
      w={{ base: '100vw', md: '80vw', xl: '70vw' }}
      mt={{ base: '100px', md: '120px' }}
      flexDir={{ base: 'column', lg: 'row' }}
      alignItems={{ base: 'center', lg: 'flex-start' }}
      gap={{ base: '10px', lg: '0px' }}
    >
      <Box w={{ base: '80%', lg: '40%' }}>
        <Calendar locale="en-GB" />
      </Box>
      <Spacer />
      <Box h="100%" w={{ base: '80%', lg: '55%' }}>
        <VStack gap="0.5em">
          <Heading
            w="100%"
            textAlign={{ base: 'center', lg: 'left' }}
            fontSize={{ base: '1.5rem', lg: '2rem' }}
          >
            Your day at a glance
          </Heading>
          <Text textAlign="left">
            Anim dolor dolore irure qui tempor. Est tempor ipsum consequat magna
            elit dolor sunt id veniam do dolor aliqua.
          </Text>
          <Text textAlign="left">
            Nisi cupidatat aute dolore reprehenderit minim nostrud cillum nisi
            duis. Ea ea dolore consectetur commodo ad ipsum deserunt.
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
}

export default MyEvents;
