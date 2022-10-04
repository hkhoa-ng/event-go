import React from 'react';
import { Center, Image, Box, Heading, Text } from '@chakra-ui/react';

function CarouselCard(props) {
  return (
    <Center position="relative" maxH="50vh">
      <Image minW="100%" src={props.src} />
      <Box position="absolute" bottom="0px" padding="5%" minW="100%">
        <Heading>Cool event</Heading>
      </Box>
    </Center>
  );
}

export default CarouselCard;
