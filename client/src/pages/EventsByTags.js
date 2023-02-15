import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { Center, Box, Flex, Container } from '@chakra-ui/react';
import Navbar from '../components/navbar/Navbar';
import UserContext from '../context/UserContext';
import EventContext from '../context/EventContext';
import EventCard from '../components/cards/EventCard';
import Carousel from '../components/container/Carousel';
import EventContainer from '../components/container/EventContainer';
import Categories from '../components/container/Categories';

function EventsByTags({ tag }) {
  const { allEvents, getEventsByTag, availableTags } = useContext(EventContext);
  const { checkIfLoggedIn } = useContext(UserContext);
  const [eventsOfTag, setEventsOfTag] = useState();
  // // this use to check if user is logged in, can be used in different pages to persist user session
  useEffect(() => {
    async function handleCheckLogIn() {
      await checkIfLoggedIn();
    }
    handleCheckLogIn();
  }, []);

  useEffect(() => {
    async function getEventsOfThisTag(tag) {
      const eventIds = await getEventsByTag(tag);
      if (eventIds !== undefined) {
        setEventsOfTag(
          allEvents.filter(event => eventIds.includes(event.event_id))
        );
      }
    }
    getEventsOfThisTag(tag);
  }, []);

  return (
    <Box>
      <Navbar />
      <Flex
        minW="90vw"
        minH="100vh"
        pt={{ base: '3.5rem', md: '5rem' }}
        flexDir={{ base: 'column', md: 'row' }}
      >
        {/* The left side bar */}
        <Categories tags={availableTags} />
        {/* Page's content */}
        <Container
          p="0"
          minW={{
            base: '100vw',
            md: '70vw',
            lg: '75vw',
            xl: '80vw',
            '2xl': '85vw',
          }}
          position={{ base: 'static', md: 'absolute' }}
          top={{ md: '3rem' }}
          right="0"
          mt={{ base: '4rem', md: '0' }}
          bg="gray.800"
        >
          {eventsOfTag !== undefined && <Carousel events={eventsOfTag} />}
          <EventContainer type={tag} key={nanoid()} showMore={false} />;
        </Container>
      </Flex>
    </Box>
  );
}

export default EventsByTags;
