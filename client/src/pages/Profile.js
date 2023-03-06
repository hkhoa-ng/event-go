import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Heading,
  HStack,
  Center,
  Image,
  Flex,
  Spacer,
  Button,
  Text,
  VStack,
  IconButton,
} from '@chakra-ui/react';
import { FaRegEdit } from 'react-icons/fa';
import Calendar from 'react-calendar';
import '../styles/Calendar.css';

import Navbar from '../components/navbar/Navbar';
import UserContext from '../context/UserContext';
import MyEvents from '../components/container/profile/MyEvents';
import { useNavigate } from 'react-router-dom';
import MyFriends from '../components/container/profile/MyFriends';
function Profile({ username }) {
  const { checkIfLoggedIn, user, allUsers } = useContext(UserContext);
  // // this use to check if user is logged in, can be used in different pages to persist user session
  useEffect(() => {
    async function handleCheckLogIn() {
      await checkIfLoggedIn();
    }
    handleCheckLogIn();
  }, []);
  const navigate = useNavigate();

  // Find the user of this profile
  const userOfThisProfile = allUsers.find(u => u.user_name === username);
  const isCurrentUser = user.attributes.preferred_username === username;

  const [show, setShow] = useState('events');

  // console.log(
  //   `User of this profile is ${userOfThisProfile.user_name}, that is ${
  //     isCurrentUser ? 'the' : 'not the'
  //   } current user`
  // );

  return (
    <Center flexDir="column">
      <Navbar />

      {/* Avatar and background image */}
      <Center my={'3em'} position="relative">
        {/* Background image */}
        <Image
          borderRadius={'10px'}
          maxH="25vh"
          w={{ base: '100vw', md: '80vw', xl: '70vw' }}
          src="https://images5.alphacoders.com/852/852883.jpg"
        />

        {/* Avatar and name */}
        <Center
          position={'absolute'}
          left={{ base: '50%', md: '0' }}
          bottom="0"
          transform={{
            base: 'translate(-50%, 65%)',
            md: 'translate(10%, 80%)',
          }}
          flexDir={{ base: 'column', md: 'row' }}
          w="85%"
        >
          {/* Profile picture */}
          <Image
            borderRadius="50%"
            w={{ base: '100px', md: '170px' }}
            src={'https://avatars2.githubusercontent.com/u/37842853?v=4'}
            border="5px solid #171923"
          />

          {/* Profile name + friends button group */}
          <VStack
            ml={{ base: 0, md: 7 }}
            alignItems={{ base: 'center', md: 'flex-start' }}
            // bg="teal"
            w="100%"
          >
            <HStack>
              <Heading fontSize={{ base: '1.5rem', md: '2rem' }}>
                {userOfThisProfile.full_name}
              </Heading>
              {isCurrentUser && (
                <IconButton
                  variant="ghost"
                  aria-label="Edit Profile"
                  icon={<FaRegEdit />}
                  onClick={() => {
                    navigate('/settings');
                  }}
                />
              )}
            </HStack>

            {isCurrentUser ? (
              <HStack>
                <Text>{`${userOfThisProfile.friends.length} friends`}</Text>
                <Spacer />
                <Button
                  onClick={() => {
                    setShow(show === 'events' ? 'friends' : 'events');
                  }}
                >
                  {show === 'events' ? 'All Friends' : 'Your events'}
                </Button>{' '}
              </HStack>
            ) : (
              <Button>Add friend</Button>
            )}
          </VStack>
        </Center>
      </Center>

      {/* Content */}

      {isCurrentUser ? (
        show === 'events' ? (
          <MyEvents />
        ) : (
          <MyFriends />
        )
      ) : (
        <Flex
          w={{ base: '100vw', md: '80vw', xl: '70vw' }}
          mt={{ base: '100px', md: '120px' }}
          flexDir={{ base: 'column', lg: 'row' }}
          alignItems={{ base: 'center', lg: 'flex-start' }}
          gap={{ base: '10px', lg: '0px' }}
        >
          <Box>
            <Heading>Events attending</Heading>
          </Box>
        </Flex>
      )}
    </Center>
  );
}

export default Profile;
