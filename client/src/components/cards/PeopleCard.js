import React from 'react';
import {
  Card,
  Text,
  ButtonGroup,
  Button,
  CardBody,
  CardFooter,
  Stack,
  Image,
  Heading,
  Avatar,
  HStack,
  AvatarGroup,
} from '@chakra-ui/react';

function PeopleCard({ fullname, username }) {
  return (
    <Stack
      p="0"
      direction={{ base: 'row', md: 'column' }}
      alignItems={'space-around'}
      justifyContent={'space-around'}
    >
      <Image
        boxSize={{ base: '120px', md: '200px' }}
        src={'https://avatars2.githubusercontent.com/u/37842853?v=4'}
        alt="People profile picture"
        borderTopRightRadius={{ base: '0px', md: 'lg' }}
        borderTopLeftRadius="lg"
        borderBottomLeftRadius={{ base: 'lg', md: '0px' }}
      />
      <Stack mt="6" spacing="3" px="0">
        <Heading size="md">{fullname}</Heading>
        {/* <HStack>
          <AvatarGroup size="sm" max={2}>
            <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
          </AvatarGroup>
          <Text size="sm" color="gray.400">
            10 mutual friends
          </Text>
        </HStack> */}
        <Text size="sm" color="gray.400">
          Connect with me!
        </Text>
        <ButtonGroup spacing="2" w="100%" size={{ base: 'sm', md: 'md' }}>
          <Button variant="solid" colorScheme="blue" w="50%">
            Add friend
          </Button>
          <Button w="50%" variant="outline">
            Remove
          </Button>
        </ButtonGroup>
      </Stack>
    </Stack>
  );
}

export default PeopleCard;
