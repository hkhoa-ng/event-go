import React from 'react';
import { Stack, Heading, Text } from '@chakra-ui/react';

function BillingSettings() {
  return (
    <Stack px="15px">
      <Heading
        fontSize={{ base: '1rem', md: '1.5rem' }}
        display={{ base: 'none', md: 'flex' }}
        pb="20px"
      >
        Billing Settings
      </Heading>
      <Text>
        Update your billing details. This include credit cards/bank information,
        and billing address.
      </Text>
    </Stack>
  );
}

export default BillingSettings;
