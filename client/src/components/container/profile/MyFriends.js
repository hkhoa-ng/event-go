import React, { useContext, useEffect, useState } from 'react';
import { SimpleGrid, VStack, Heading, Box, Text } from '@chakra-ui/react';
import UserContext from '../../../context/UserContext';
import PeopleCard from '../../cards/PeopleCard';

function MyFriends() {
  const { allUsers, user } = useContext(UserContext);
  const currentUser = user ? user.attributes : null;

  const [elements, setElements] = useState([]);

  useEffect(() => {
    setElements(
      allUsers
        // First, filter users that are not the current logged in user
        .filter(u => u.email !== currentUser.email)
        // Then, filter users that are not friend with current logged in user
        .filter(u => currentUser.friends.includes(u.email))
        .map(u => {
          // console.table(u);
          return (
            <PeopleCard
              key={u.user_name}
              fullname={u.full_name}
              username={u.user_name}
              email={u.email}
              friends={u.friends}
              button={'Unfriend'}
            />
          );
        })
    );
  }, [allUsers]);

  return (
    <Box
      w={{ base: '100vw', md: '80vw', xl: '70vw' }}
      mt={{ base: '100px', md: '120px' }}
      flexDir={{ base: 'column', lg: 'row' }}
      alignItems={{ base: 'center', lg: 'flex-start' }}
      gap={{ base: '10px', lg: '0px' }}
      pb={20}
    >
      <VStack w="100%">
        <Heading textAlign="center">{`All friends (${elements.length})`}</Heading>
        {elements.length > 0 ? (
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
            spacing="2rem"
            maxW={{ base: '100%', md: '90%' }}
            pt="2rem"
          >
            {elements}
          </SimpleGrid>
        ) : (
          <Text p="20px">You have no friends! Go make some!</Text>
        )}
      </VStack>
    </Box>
  );
}

export default MyFriends;
