import React, { useContext, useState, useEffect } from 'react';
import {
  Heading,
  SimpleGrid,
  Divider,
  Button,
  VStack,
  HStack,
} from '@chakra-ui/react';
import EventContext from '../../context/EventContext';
import { nanoid } from 'nanoid';

import EventCard from '../cards/EventCard';

function EventContainer(props) {
  const { allEvents, getEventsByTag } = useContext(EventContext);
  const [eventsOfTag, setEventsOfTag] = useState();
  const [elements, setElements] = useState();

  async function getEventsOfThisTag(tag) {
    const eventIds = await getEventsByTag(tag);
    if (eventIds !== undefined) {
      setEventsOfTag(
        allEvents.filter(event => eventIds.includes(event.event_id))
      );
    }
  }

  useEffect(() => {
    getEventsOfThisTag(props.type);
  }, []);

  useEffect(() => {
    if (eventsOfTag !== undefined) {
      setElements(
        eventsOfTag.map(event => <EventCard event={event} key={nanoid()} />)
      );
    }
  }, [eventsOfTag]);

  return (
    <VStack m={10} mb={20}>
      <Heading textAlign="center">
        {props.type.replace(/^\w/, c => c.toUpperCase())}
      </Heading>

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
        spacing="10px"
        maxW={{ base: '100%', md: '90%' }}
      >
        {elements}
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
