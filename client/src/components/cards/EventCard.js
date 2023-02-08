import React from 'react';
import { Heading, Text, Badge, Image, VStack, Flex } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';

function EventCard(props) {
  // console.table(props.event);
  // console.log(`Tags of ${props.event.event_name} are: ${props.event.tags}`);
  const date = new Date(props.event.event_time);
  const formattedDate = date
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .replace(/\//g, '-');
  return (
    <Link to={`/${props.event.event_id}`}>
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
          borderRadius={5}
          src={props.event.image}
        />

        <VStack alignItems="flex-start" gap={0}>
          <Heading
            fontSize={{ base: 'lg', xl: 'xl' }}
            fontWeight="black"
            textTransform={'uppercase'}
          >
            {props.event.event_name}
          </Heading>
          <Flex gap="5px" flexWrap="wrap">
            {props.event.tags.map(tag => (
              <Badge variant="solid" colorScheme="telegram" key={nanoid()}>
                {tag}
              </Badge>
            ))}
          </Flex>

          <Text fontWeight={'medium'}>{formattedDate}</Text>
        </VStack>
      </VStack>
    </Link>
  );
}

export default EventCard;
