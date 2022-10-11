import React from 'react';
import {
  Box,
  Container,
  Text,
  Heading,
  SimpleGrid,
  Divider,
  Button,
  VStack,
  HStack,
} from '@chakra-ui/react';

import EventCard from '../cards/EventCard';

function EventContainer(props) {
  return (
    <VStack m={10} mb={20}>
      <Heading textAlign="center">{props.type}</Heading>

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
        spacing="10px"
        maxW={{ base: '100%', md: '90%' }}
      >
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </SimpleGrid>
      <HStack w="90%">
        <Divider />
        <Button w={{ base: '60%', sm: '45%', md: '40%', lg: '35%', xl: '20%' }}>
          Show more
        </Button>
        <Divider />
      </HStack>
    </VStack>
  );
}

export default EventContainer;
