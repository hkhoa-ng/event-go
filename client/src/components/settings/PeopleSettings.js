import React from 'react';
import { Stack, Heading, Text } from '@chakra-ui/react';
function PeopleSettings() {
  return (
    <Stack px="15px">
      <Heading
        fontSize={{ base: '1rem', md: '1.5rem' }}
        display={{ base: 'none', md: 'flex' }}
        pb="20px"
      >
        People Settings
      </Heading>
      <Text>Update your discography, social, and friends settings here.</Text>
    </Stack>
  );
}

export default PeopleSettings;
