import React, { useState, useEffect } from 'react';
import {
  HStack,
  Image,
  Center,
  VStack,
  Text,
  Heading,
  Input,
  Button,
  Spacer,
  Divider,
  Icon,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
function RecoverPassword() {
  return (
    <HStack bg={{ base: 'gray.800', md: 'gray.700' }} h="100vh">
      <Image
        src="./images/login.svg"
        display={{ base: 'none', md: 'flex' }}
        maxW="50%"
        px={{ base: 0, md: '10' }}
      />
      <Center
        h="90vh"
        w={{ base: '100%', md: '45%' }}
        bg={{ base: 'gray.800', md: 'gray.800' }}
        borderRadius={'20px'}
      >
        <VStack alignItems="flex-start" w="80%" gap={1}>
          {' '}
          <Heading>Password recovery</Heading>
          <Text pb={3}>Recover your password with your Google account.</Text>
          <Button w="100%" colorScheme="messenger" variant="outline">
            <Icon as={FcGoogle} mr={5} />
            Sign in with Google
          </Button>
          <HStack w="100%" py={5}>
            <Divider />
            <Text>or</Text>
            <Divider />
          </HStack>
          <Text>Enter your username or email for a recovery link.</Text>
          <Input variant="flushed" placeholder="Username or Email" />
          <HStack w="100%" py={3}>
            <Spacer />
          </HStack>
          <Button w="100%" variant="solid" colorScheme="messenger">
            Send recovery email
          </Button>
        </VStack>
      </Center>
    </HStack>
  );
}

export default RecoverPassword;
