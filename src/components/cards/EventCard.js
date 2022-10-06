import React from 'react';
import {
  Box,
  Heading,
  Text,
  Badge,
  Image,
  VStack,
  LinkBox,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function EventCard() {
  const event = 'a-random-event';
  return (
    <Link to={`/event-go/${event}`}>
      <VStack
        flexDir={{ base: 'row', md: 'column' }}
        p={5}
        gap={{ base: 5, md: 1 }}
        alignItems={{ base: 'center', md: 'flex-start' }}
        _hover={{ background: 'gray.800' }}
        borderRadius={10}
      >
        <Image
          maxW={{ base: '50%', md: '100%' }}
          position="relative"
          borderRadius={5}
          src="https://images.unsplash.com/photo-1516981442399-a91139e20ff8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        />
        <Badge
          position="absolute"
          variant="solid"
          transform={'translate(20%, 10%)'}
          colorScheme="telegram"
        >
          Music
        </Badge>
        <VStack alignItems="flex-start" gap={0}>
          <Heading
            fontSize={{ base: 'lg', xl: 'xl' }}
            fontWeight="black"
            textTransform={'uppercase'}
          >
            Some random event with long name!
          </Heading>
          <Text fontWeight={'medium'}>18.11.2022</Text>
        </VStack>
      </VStack>
    </Link>
  );
}

export default EventCard;
