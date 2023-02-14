import React, { useEffect, useContext, useState } from 'react';
import {
  HStack,
  Image,
  Center,
  VStack,
  Heading,
  Text,
  Button,
  Icon,
  Divider,
  Input,
  Checkbox,
  Spacer,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
// import { FaPhoneAlt } from 'react-icons/fa';
import UserContext from '../context/UserContext';
import SignUpForm from '../components/inputs/SignUpForm';

function SignUp() {
  const {
    handleSignUp,
    // Setter for signing up
    setDob,
    setEmail,
    setName,
    setPreferredUsername,
    setPhoneNum,
    setPassword,
    setConfirmPassword,
    confirmSignUp,
    authCode,
    setAuthCode,
    resendConfirmationCode,
    user,
  } = useContext(UserContext);

  const setSignUpState = () => {
    setEmail('nhkhoa020400@gmail.com');
    // Sanity check: number + uppercase + letter + special characters + at least 8 chars
    setPreferredUsername('nhkhoa');
    setPassword('123456Ta@!');
    setPhoneNum('+358123456789');
    setName('Khoa Nguyen');

    // DOB format: yyyy-mm-dd
    setDob('2012-09-02');
    console.log('Set state!');
  };

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
          <Heading pb={5}>Create your account!</Heading>

          <Button w="100%" colorScheme="messenger" variant="outline">
            <Icon as={FcGoogle} mr={5} />
            Create an account with Google
          </Button>
          <HStack w="100%" pt={5}>
            {/* <Divider />
            <Text>or</Text> */}
            <Divider />
          </HStack>

          {/* Sign up information */}

          <SignUpForm />

          {/* <Button
            w="100%"
            variant="solid"
            colorScheme="messenger"
            onClick={async e => {
              await handleSignUp(e);
            }}
          >
            Sign up
          </Button> */}

          {/* <Input
            variant="flushed"
            placeholder="Verification code"
            type="text"
            value={authCode}
            onChange={e => {
              setAuthCode(e.target.value);
            }}
          />
          <HStack>
            <Button
              onClick={() => {
                confirmSignUp();
              }}
            >
              Confirm code
            </Button>
            <Button
              onClick={() => {
                resendConfirmationCode();
              }}
            >
              Resend Verification code
            </Button>
          </HStack> */}
        </VStack>
      </Center>
    </HStack>
  );
}

export default SignUp;
