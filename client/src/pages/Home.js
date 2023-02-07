import React, { useContext } from 'react';
import {
  Box,
  Container,
  Heading,
  IconButton,
  Text,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';

import Carousel from '../components/container/Carousel';
import Categories from '../components/container/Categories';
import EventContainer from '../components/container/EventContainer';
import Navbar from '../components/navbar/Navbar';

import EventContext from '../context/EventContext';

function Home(props) {
  const { allEvents, availableTags } = useContext(EventContext);

  return (
    <Box>
      <Navbar username={'hkhoa'} name="Khoa Nguyen" />
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
          <Carousel events={allEvents} />
          <EventContainer type="Popular" />
          <EventContainer type="Near you" />
          <EventContainer type="Popular with friends" />
        </Container>
      </Flex>
    </Box>
  );
}

export default Home;
