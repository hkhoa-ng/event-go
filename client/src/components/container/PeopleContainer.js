import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import {
  Heading,
  SimpleGrid,
  VStack,
  HStack,
  Divider,
  Button,
} from '@chakra-ui/react';
import PeopleCard from '../cards/PeopleCard';
import UserContext from '../../context/UserContext';

function PeopleContainer({ title, showMore, users }) {
  const { user } = useContext(UserContext);
  const currentUser = user ? user.attributes : null;

  const [elements, setElements] = useState();

  useEffect(() => {
    setElements(
      users
        // First, filter users that are not the current logged in user
        .filter(u => u.email !== currentUser.email)
        // Then, filter users that are not friend with current logged in user
        .filter(u => !currentUser.friends.includes(u.email))
        .map(u => {
          // console.table(u);
          return (
            <PeopleCard
              key={u.user_name}
              fullname={u.full_name}
              username={u.user_name}
              email={u.email}
              friends={u.friends}
              button={'Add friend'}
            />
          );
        })
    );
  }, [users]);

  return (
    <VStack m={10} mb={20}>
      <Heading textAlign="center">{title}</Heading>

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
        spacing="2rem"
        maxW={{ base: '100%', md: '90%' }}
        pt="2rem"
      >
        {elements}
      </SimpleGrid>
      {showMore && (
        <HStack w="90%">
          <Divider />
          <Button
            w={{ base: '60%', sm: '45%', md: '40%', lg: '35%', xl: '20%' }}
            onClick={() => {
              //   navigate(`/events/${props.type.replace(/\s+/g, '-')}`);
            }}
          >
            Show more
          </Button>
          <Divider />
        </HStack>
      )}
    </VStack>
  );
}

export default PeopleContainer;
