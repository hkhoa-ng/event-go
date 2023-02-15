import React, { useContext, useEffect, useState } from 'react';
import { Box, Container, Flex } from '@chakra-ui/react';

import Carousel from '../components/container/Carousel';
import Categories from '../components/container/Categories';
import EventContainer from '../components/container/EventContainer';
import Navbar from '../components/navbar/Navbar';

import EventContext from '../context/EventContext';
import UserContext from '../context/UserContext';
import { nanoid } from 'nanoid';

function Home() {
  const { allEvents, availableTags } = useContext(EventContext);
  const { checkIfLoggedIn } = useContext(UserContext);
  // // this use to check if user is logged in, can be used in different pages to persist user session
  useEffect(() => {
    async function handleCheckLogIn() {
      await checkIfLoggedIn();
    }
    handleCheckLogIn();
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
          <Carousel events={allEvents} />
          {availableTags.map(tag => {
            return <EventContainer type={tag} key={nanoid()} showMore={true} />;
          })}
        </Container>
      </Flex>
    </Box>
  );
}

export default Home;
