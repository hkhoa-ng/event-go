import React, { useState, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Text,
  Input,
  FormControl,
  FormLabel,
  HStack,
  Checkbox,
  Spacer,
  VStack,
  InputRightElement,
  IconButton,
  InputGroup,
  FormHelperText,
  Highlight,
  Heading,
  Link,
} from '@chakra-ui/react';
import { BiShow, BiHide } from 'react-icons/bi';
import UserContext from '../../context/UserContext';

const labelStyle = {
  fontWeight: 'bold',
  marginTop: '1.5rem',
};

const Stage1 = ({ setStage }) => {
  const {
    email,
    setEmail,
    preferredUsername,
    setPreferredUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    validateEmail,
    validatePassword,
    validatePreferredUsername,
  } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [validEmail, setValidEmail] = useState();
  const [validPassword, setValidPassword] = useState();
  const [validUsername, setValidUsername] = useState();

  function nextStage() {
    setValidEmail(validateEmail);
    setValidPassword(validatePassword);
    setValidUsername(validatePreferredUsername);
    if (validateEmail() && validatePassword() && validatePreferredUsername()) {
      setStage(2);
    }
  }

  return (
    <VStack>
      <Text alignSelf={'left'} w="100%">
        Sign up using your credentials.
      </Text>
      <FormControl>
        <FormLabel style={labelStyle}>Email address</FormLabel>
        <Input
          isInvalid={validEmail === false ? true : false}
          mt="-1rem"
          type="email"
          placeholder="Enter a valid email: email@example.com"
          variant="flushed"
          _placeholder={{ color: validEmail === false ? 'red.200' : 'inherit' }}
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
        />
        <FormLabel style={labelStyle}>Username</FormLabel>
        <Input
          isInvalid={validUsername === false ? true : false}
          mt="-1rem"
          type="text"
          placeholder="Enter your username"
          variant="flushed"
          _placeholder={{
            color: validUsername === false ? 'red.200' : 'inherit',
          }}
          value={preferredUsername}
          onChange={e => {
            setPreferredUsername(e.target.value);
          }}
        />
        <FormLabel style={labelStyle}>Password</FormLabel>
        <InputGroup>
          <Input
            isInvalid={validPassword === false ? true : false}
            pr="4.5rem"
            type={show ? 'text' : 'password'}
            placeholder="Enter a password"
            _placeholder={{
              color: validPassword === false ? 'red.200' : 'inherit',
            }}
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
        <FormHelperText
          color={validPassword === false ? 'red.300' : 'gray.400'}
        >
          Password must have at least 8 characters, contains number, uppercase &
          lowercase letters, and special characters.
        </FormHelperText>
        <FormLabel style={labelStyle}>Confirm password</FormLabel>
        <InputGroup>
          <Input
            isInvalid={validPassword === false ? true : false}
            pr="4.5rem"
            type={show ? 'text' : 'password'}
            placeholder="Re-enter password"
            _placeholder={{
              color: validPassword === false ? 'red.200' : 'inherit',
            }}
            variant="flushed"
            value={confirmPassword}
            onChange={e => {
              setConfirmPassword(e.target.value);
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
        <FormHelperText
          color={validPassword === false ? 'red.300' : 'gray.400'}
        >
          Enter the same password as above.
        </FormHelperText>
      </FormControl>
      <HStack w="100%" pt="2rem">
        <Button
          onClick={() => {
            nextStage();
          }}
          w="100%"
          colorScheme={'green'}
          variant="solid"
        >
          Next
        </Button>
      </HStack>
    </VStack>
  );
};

const Stage2 = ({ setStage }) => {
  const {
    name,
    setName,
    phoneNum,
    setPhoneNum,
    dob,
    setDob,
    setConfirmPassword,
    setPreferredUsername,
    validatePhoneNum,
    validateName,
    validateDob,
    handleSignUp,
  } = useContext(UserContext);
  const [validName, setValidName] = useState();
  const [validPhoneNum, setValidPhoneNum] = useState();
  const [validDob, setValidDob] = useState();

  function previousStage() {
    setConfirmPassword('');
    setPreferredUsername('');
    setStage(1);
  }
  async function submitSignUp(e) {
    setValidName(validateName);
    setValidPhoneNum(validatePhoneNum);
    setValidDob(validateDob);
    if (validateName() && validatePhoneNum() && validateDob()) {
      await handleSignUp(e);
      setStage(3);
    } else {
      console.log(`Name is ${validateName()}`);
      console.log(`Phone number is ${validatePhoneNum()}`);
      console.log(`D.O.B is ${validateDob()}`);
      console.log(`D.O.B is : ${dob}`);
    }
  }
  return (
    <VStack w="100%">
      <Text alignSelf={'left'} w="100%">
        Sign up using your credentials.
      </Text>
      <FormControl>
        <FormLabel style={labelStyle}>Full Name</FormLabel>
        <Input
          isInvalid={validName === false ? true : false}
          mt="-1rem"
          variant="flushed"
          placeholder="Enter your first & last name"
          type="text"
          _placeholder={{ color: validName === false ? 'red.200' : 'inherit' }}
          value={name}
          onChange={e => {
            setName(e.target.value);
          }}
        />
        <FormLabel style={labelStyle}>Phone number</FormLabel>
        <Input
          mt="-1rem"
          isInvalid={validPhoneNum === false ? true : false}
          variant="flushed"
          placeholder="Enter a valid phone number."
          type="tel"
          _placeholder={{
            color: validPhoneNum === false ? 'red.200' : 'inherit',
          }}
          value={phoneNum}
          onChange={e => {
            setPhoneNum(e.target.value.replace(/\s/g, ''));
          }}
        />
        <FormHelperText
          color={validPhoneNum === false ? 'red.300' : 'gray.400'}
        >
          Valid phone number format: +358 123456789
        </FormHelperText>
        <FormLabel style={labelStyle}>Day of Birth</FormLabel>
        <Input
          isInvalid={validDob === false ? true : false}
          mt="-1rem"
          type="date"
          variant="flushed"
          _placeholder={{ color: 'inherit' }}
          value={dob}
          onChange={e => {
            setDob(e.target.value);
          }}
        />
        <FormHelperText>Date format: MM-DD-YYYY</FormHelperText>
      </FormControl>
      {/* <HStack w="100%" pt="1rem">
        <Checkbox>Receive emails on news and promotions</Checkbox>
        <Spacer />
      </HStack> */}
      <HStack justifyContent="space-around" w="100%" pt="1rem">
        <Button
          onClick={() => {
            previousStage();
          }}
          w="50%"
          colorScheme={'red'}
          variant="outline"
        >
          Previous
        </Button>
        <Button
          onClick={async e => {
            await submitSignUp(e);
          }}
          w="50%"
          colorScheme={'green'}
          variant="solid"
        >
          Sign up
        </Button>
      </HStack>
    </VStack>
  );
};

const Stage3 = () => {
  const {
    email,
    authCode,
    setAuthCode,
    resendConfirmationCode,
    confirmSignUp,
  } = useContext(UserContext);
  const [validAuthCode, setValidAuthCode] = useState();
  const [helpText, setHelpText] = useState(
    'Remember to check your spam emails. The code should has 6 digits.'
  );
  const [helpTextColor, setHelpTextColor] = useState('gray.400');

  function changeHelpText(status) {
    setHelpText(status);
    if (status === 'Confirmation success!') {
      setHelpTextColor('green.300');
      return;
    }
    if (status === 'Code resent successfully!') {
      setHelpTextColor('green.300');
      return;
    }
    setHelpTextColor('red.300');
  }

  return (
    <VStack w="100%">
      <Heading>Confirm your email</Heading>
      <Text>
        A confirmation code has been sent to <b>{email}</b>. Check your email
        and enter the code below to complete the sign up process.
      </Text>
      <FormControl pb="2rem">
        <FormLabel style={labelStyle}>Confirmation code</FormLabel>
        <Input
          mt="-1rem"
          variant="flushed"
          placeholder="Enter confirmation code"
          type="text"
          _placeholder={{
            color: validAuthCode === false ? 'red.200' : 'inherit',
          }}
          value={authCode}
          onChange={e => {
            setAuthCode(e.target.value);
          }}
        />
        <FormHelperText color={helpTextColor}>{helpText}</FormHelperText>
      </FormControl>
      {helpText !== 'Confirmation success!' ? (
        <HStack w="100%">
          <Button
            w="50%"
            variant="outline"
            colorScheme="red"
            onClick={async () => {
              const status = await resendConfirmationCode();
              changeHelpText(status);
            }}
          >
            Resend Code
          </Button>
          <Button
            w="50%"
            colorScheme="green"
            onClick={async () => {
              const status = await confirmSignUp();
              changeHelpText(status);
            }}
          >
            Confirm Code
          </Button>
        </HStack>
      ) : (
        <Link as={RouterLink} to="/" w="100%">
          <Button colorScheme="green" w="100%">
            Return Home
          </Button>
        </Link>
      )}
    </VStack>
  );
};

const SignUpForm = () => {
  const { validateEmail, validatePassword } = useContext(UserContext);
  const [stage, setStage] = useState(1);

  const handleSubmit = event => {
    event.preventDefault();
    // handle form submission
  };

  const nextStage = () => {
    if (stage === 1) {
      setStage(prevStage => prevStage + 1);
    }
  };

  const previousStage = () => {
    setStage(prevStage => prevStage - 1);
  };

  return (
    <VStack
      w="100%"
      justifyContent="space-around"
      alignItems="space-between"
      gap="1rem"
    >
      {stage === 1 && <Stage1 setStage={setStage} />}
      {stage === 2 && <Stage2 setStage={setStage} />}
      {stage === 3 && <Stage3 />}
    </VStack>
  );
};

export default SignUpForm;
