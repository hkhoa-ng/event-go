import React from 'react';
import { Stack, Heading, Text } from '@chakra-ui/react';
function SecuritySettings() {
  return (
    <Stack px="15px">
      <Heading
        fontSize={{ base: '1rem', md: '1.5rem' }}
        display={{ base: 'none', md: 'flex' }}
        pb="20px"
      >
        Security Settings
      </Heading>
      <Text>Update your password and other security settings here.</Text>
    </Stack>
  );
}

export default SecuritySettings;
