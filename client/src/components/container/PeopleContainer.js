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
import UserContext from '../../context/UserContext';
import PeopleCard from '../cards/PeopleCard';

function PeopleContainer({ title, showMore, users }) {
  const [elements, setElements] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setElements(
      users.map(u => {
        console.table(u);
        return <PeopleCard fullname={u.full_name} username={u.user_name} />;
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
