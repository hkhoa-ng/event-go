import React from 'react';
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

function Home(props) {
  const imageUrl = [
    'https://images.unsplash.com/photo-1549451371-64aa98a6f660?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1433622070098-754fdf81c929?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1462965326201-d02e4f455804?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
  ];
  return (
    <Flex
      minW="90vw"
      minH="100vh"
      bg="brand.800"
      pt={{ base: '3.5rem', md: '5rem' }}
      flexDir={{ base: 'column', md: 'row' }}
    >
      {/* The left side bar */}
      <Categories />

      {/* Page's content */}
      <Container
        maxW={{
          base: '90vw',
          md: '60vw',
          lg: '67vw',
          xl: '72vw',
          '2xl': '76vw',
        }}
        position={{ base: 'static', md: 'absolute' }}
        right={{ base: '0', md: '4vw' }}
        top={{ md: '5rem' }}
        mt={{ base: '20', md: '0' }}
      >
        <Carousel urls={imageUrl} />
      </Container>
    </Flex>
  );
}

export default Home;
