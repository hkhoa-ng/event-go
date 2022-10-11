import React, { useState } from 'react';
import {
  Box,
  HStack,
  Image,
  Center,
  VStack,
  Text,
  Heading,
  Input,
  Button,
  Checkbox,
  Spacer,
  Divider,
  Icon,
  Link,
} from '@chakra-ui/react';

import Carousel from '../components/container/Carousel';
import { FcGoogle } from 'react-icons/fc';

function Login() {
  const events = [
    {
      name: 'Random event name',
      description: 'Some very random description',
      img: 'https://images.unsplash.com/photo-1549451371-64aa98a6f660?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    },
    {
      name: 'Another random event with yet even longer name',
      description: 'Random description here! Very exciting!',
      img: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
    {
      name: 'Such amazing pool party!',
      description: 'Something truly magical!',
      img: 'https://images.unsplash.com/photo-1433622070098-754fdf81c929?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
  ];

  const [page, setPage] = useState('login');

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
          {page === 'login' && <Heading>Welcome back!</Heading>}
          {page === 'forgotPassword' && <Heading>Password recovery</Heading>}
          {page === 'signup' && <Heading>Create your account!</Heading>}
          {page === 'login' && <Text pb={3}>Login to your account.</Text>}
          {page === 'forgotPassword' && (
            <Text pb={3}>Recover your password with an email.</Text>
          )}
          {page === 'signup' && <Text pb={3}>Create an account.</Text>}

          <Button w="100%" colorScheme="messenger" variant="outline">
            <Icon as={FcGoogle} mr={5} />
            Sign in with Google
          </Button>
          <HStack w="100%" py={5}>
            <Divider />
            <Text>or</Text>
            <Divider />
          </HStack>
          <Text>Enter your credentials.</Text>
          {page !== 'forgotPassword' && (
            <Input variant="flushed" placeholder="Username or Email" />
          )}
          {page === 'forgotPassword' && (
            <Input variant="flushed" placeholder="Email" />
          )}
          {page !== 'forgotPassword' && (
            <Input variant="flushed" placeholder="Password" type="password" />
          )}
          {page === 'signup' && (
            <Input
              variant="flushed"
              placeholder="Repeat password"
              type="password"
            />
          )}

          <HStack w="100%" py={3}>
            {page === 'login' && (
              <Checkbox defaultChecked>Remember me</Checkbox>
            )}
            {page === 'signup' && (
              <Checkbox>Receive emails on news and promotions</Checkbox>
            )}
            <Spacer />
            {page === 'login' && (
              <Link
                color="frenchPink.300"
                onClick={() => {
                  setPage('forgotPassword');
                }}
              >
                Forgot password?
              </Link>
            )}
          </HStack>
          {page === 'login' && (
            <Button w="100%" variant="solid" colorScheme="messenger">
              Login
            </Button>
          )}
          {page === 'signup' && (
            <Button w="100%" variant="solid" colorScheme="messenger">
              Sign up
            </Button>
          )}
          {page === 'forgotPassword' && (
            <Button w="100%" variant="solid" colorScheme="messenger">
              Send recovery email
            </Button>
          )}
          {page === 'login' && (
            <Text>
              Don't have an account?{' '}
              <Link
                color="frenchPink.300"
                onClick={() => {
                  setPage('signup');
                }}
              >
                Sign up!
              </Link>
            </Text>
          )}
        </VStack>
      </Center>
    </HStack>
  );
}

export default Login;
