import React, { useState, useEffect } from 'react';
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
import { Auth, Hub } from 'aws-amplify';
import '../utility/amplifyConfig'
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
  // sign in attributes: email, password
  // sign up attributes (all must have): dob(YYYY-MM-DD), email, name (full name), preferredUserName, phoneNum, password
  const [dob, setDob] = useState(null);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [preferredUserName, setPreferredUsername] = useState(null);
  const [phoneNum, setPhoneNum] = useState(null);
  const [password, setPassword] = useState(null)
  const [error, setError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // confirmation attribute: email, authCode
  const [authCode, setAuthCode] = useState(null)
  // user object
  const [user, setUser] = useState(null)
  const [customState, setCustomState] = useState(null);
  const [loading, setLoading] = useState(true);

  // this use to check if user is logged in, can be used in different pages to persist user session
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setUser(user);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  // this use to persist user session even with refresh button pressed by using the local storage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
      return;
    }

    Auth.currentSession()
      .then((session) => {
        setUser(session.getIdToken().payload);
        localStorage.setItem('user', JSON.stringify(session.getIdToken().payload));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  // use to listen for google login, because our require information has birthdate and phone_number, if the ggl account haven't provided that, it can't be logged in
  // Google login example button
  // <button onClick={() => Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google })}>Open Google</button>
  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          setUser(data);
          break;
        case "signOut":
          setUser(null);
          break;
        case "customOAuthState":
          setCustomState(data);
          break;
        default:
          break;

      }
    });

    Auth.currentAuthenticatedUser()
      .then(currentUser => setUser(currentUser))
      .catch(() => console.log("Not signed in"));

    return unsubscribe;
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
        const { user } = await Auth.signUp({
            username : email,
            password,
            attributes: {
                email,         
                phone_number: phoneNum, // format +35804000
                name,
                preferred_username: preferredUserName,
                birthdate: dob
            },
            autoSignIn: { 
                enabled: true,
            }
        });
        setUser(user)
        console.log(user);
    } catch (error) {
        // will be an error if user email existed in database,
        setError(error)
    }
  }
  const resendConfirmationCode = async () => {
    try {
        await Auth.resendSignUp(email);
        console.log('code resent successfully');
    } catch (err) {
        console.log('error resending code: ', err);
    }
  }

  const confirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(email, authCode);
    } catch (error) {
        console.log('error confirming sign up', error);
    }
  }

  const listenToAutoSignInEvent = () => {
    Hub.listen('auth', ({ payload }) => {
        const { event } = payload;
        if (event === 'autoSignIn') {
            const user = payload.data;
            // assign user
            setUser(user)
        } else if (event === 'autoSignIn_failure') {
            // redirect to sign in page
        }
    })
  }
  // after sign in, will redirect to https://localhost:3000/
  // AccessToken: A token that is passed to an API to provide access to protected resources.
  // ExpiresIn: The number of seconds until the AccessToken and IdToken expire.
  // IdToken: A JSON Web Token (JWT) that contains information about the authenticated user, such as the user's email and phone number.
  // RefreshToken: A token that can be used to request a new set of tokens if the original tokens have expired.
  // TokenType: The type of token, which is usually "Bearer".
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await Auth.signIn(email, password)
                .then(({ accessToken, idToken, refreshToken, user }) => {
                  setUser(user)
                  // set more needed information
                })
    // access user data here;
      setUser()
      console.log('Sign in successful');
    } catch (err) {
      setError(err.message);
    }
  };

  const signOut = async () => {
    try {
        await Auth.signOut();
    } catch (error) {
        setError(error)
        console.log('error signing out: ', error);
    }
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
