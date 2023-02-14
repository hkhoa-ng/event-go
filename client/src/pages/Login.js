import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
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
  InputGroup,
  InputRightElement,
  IconButton,
  FormHelperText,
  FormControl,
} from '@chakra-ui/react';
import { Link as RouterLink, Router } from 'react-router-dom';
import { BiShow, BiHide } from 'react-icons/bi';
import { FcGoogle } from 'react-icons/fc';
import { Auth, Hub } from 'aws-amplify';
import '../utility/amplifyConfig';
import UserContext from '../context/UserContext';

function Login() {
  const [loading, setLoading] = useState(true);
  const {
    email,
    password,
    listenForGoogleLogin,
    handleSignIn,
    setEmail,
    setPassword,
  } = useContext(UserContext);

  // State for showing password
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  // use to listen for google login, because our require information has birthdate and phone_number, if the ggl account haven't provided that, it can't be logged in
  // Google login example button
  // <button onClick={() => Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google })}>Open Google</button>
  useEffect(() => {
    listenForGoogleLogin();
  }, []);

  function handleSignInStatus(status) {
    if (status === 'Success!') {
      navigate('/');
      return;
    }
    setError(status);
  }

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
          <Heading>Welcome back!</Heading>
          <Text pb={3}>Login to your account.</Text>

          <Button
            w="100%"
            colorScheme="messenger"
            variant="outline"
            // onClick={() =>
            //   Auth.federatedSignIn({
            //     provider: CognitoHostedUIIdentityProvider.Google,
            //   })
            // }
          >
            <Icon as={FcGoogle} mr={5} />
            Continue with Google
          </Button>
          <HStack w="100%" py={5}>
            <Divider />
            <Text>or</Text>
            <Divider />
          </HStack>
          <Text>Enter your credentials.</Text>
          <FormControl>
            <Input
              value={email}
              _placeholder={{ color: 'inherit' }}
              variant="flushed"
              placeholder="Email"
              type="text"
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                _placeholder={{ color: 'inherit' }}
                type={show ? 'text' : 'password'}
                placeholder="Password"
                variant="flushed"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                }}
              />
              <InputRightElement>
                <IconButton
                  icon={show ? <BiHide /> : <BiShow />}
                  h="1.75rem"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShow(prev => !prev);
                  }}
                />
              </InputRightElement>
            </InputGroup>
            <FormHelperText color={error ? 'red.300' : 'gray.400'}>
              {error ? error : 'Login using email and password.'}
            </FormHelperText>
          </FormControl>

          <HStack w="100%" py={3}>
            {/* <Checkbox defaultChecked>Remember me</Checkbox> */}

            {/* <Spacer /> */}

            <Link as={RouterLink} color="frenchPink.300" to="/recover">
              Forgot password?
            </Link>
          </HStack>

          <Button
            w="100%"
            variant="solid"
            colorScheme="messenger"
            onClick={async e => {
              const status = await handleSignIn(e);
              handleSignInStatus(status);
            }}
          >
            Login
          </Button>
          {/* <Button
            onClick={() => {
              console.log(user);
            }}
          >
            Print user
          </Button> */}

          <Text>
            Don't have an account?{' '}
            <Link as={RouterLink} color="frenchPink.300" to="/signup">
              Sign up!
            </Link>
          </Text>
        </VStack>
      </Center>
    </HStack>
  );
}

export default Login;
