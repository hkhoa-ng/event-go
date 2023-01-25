import React from 'react';
import {
  Center,
  Image,
  Box,
  Heading,
  Text,
  VStack,
  Badge,
  HStack,
  IconButton,
  LinkOverlay,
  LinkBox,
} from '@chakra-ui/react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function CarouselCard(props) {
  const event = 'a-random-event';
  return (
    <LinkBox position="relative" maxH="50vh">
      <Image minW="100%" src={props.src} />
      <Box
        position="absolute"
        bottom={{ base: '5%' }}
        left="2.5%"
        maxW={{ base: '95%' }}
        bg="rgba(43, 50, 59, 0.7)"
        borderRadius={'10px'}
      >
        <HStack gap={2} p={4} maxW="100%">
          <VStack alignItems="flex-start">
            <Heading
              fontSize={{ base: '2xl', lg: '3xl' }}
              fontWeight={'black'}
              p={0}
            >
              {props.name}
            </Heading>
            <Text fontSize="sm" fontWeight="medium" p={0}>
              {props.description}
            </Text>
          </VStack>
          <Box>
            <Link to={`/${event}`} bg="teal">
              <IconButton
                icon={<FiMoreHorizontal />}
                borderRadius="50%"
                variant="solid"
                fontSize="2xl"
              />
            </Link>
          </Box>
        </HStack>
      </Box>
    </LinkBox>
  );
}

export default CarouselCard;
