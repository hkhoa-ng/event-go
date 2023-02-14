import React, { useContext } from 'react';
import {
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Switch,
  SimpleGrid,
  HStack,
} from '@chakra-ui/react';
import UserContext from '../../context/UserContext';

function GeneralSettings() {
  const { user } = useContext(UserContext);
  const userInfo = user.attributes;
  return (
    <Stack pl="15px" gap="20px" pb="20px">
      <Heading
        fontSize={{ base: '1rem', md: '1.5rem' }}
        display={{ base: 'none', md: 'flex' }}
        pb="20px"
      >
        General Settings
      </Heading>
      <FormControl display="flex" alignItems="center">
        <SimpleGrid columns={{ base: 1, md: 2 }} w="100%" spacing="20px">
          <HStack>
            <FormLabel htmlFor="email-alerts" mb="0" fontWeight="regular">
              Enable email alerts?
            </FormLabel>
            <Switch id="email-alerts" />
          </HStack>
          <HStack>
            <FormLabel htmlFor="email-alerts" mb="0" fontWeight="regular">
              Enable text message alerts?
            </FormLabel>
            <Switch id="email-alerts" />
          </HStack>
          <HStack>
            <FormLabel htmlFor="email-alerts" mb="0" fontWeight="regular">
              Enable website notification?
            </FormLabel>
            <Switch id="email-alerts" />
          </HStack>
          <HStack>
            <FormLabel htmlFor="email-alerts" mb="0" fontWeight="regular">
              Get news & promotions through email?
            </FormLabel>
            <Switch id="email-alerts" />
          </HStack>
        </SimpleGrid>
      </FormControl>
    </Stack>
  );
}

export default GeneralSettings;
