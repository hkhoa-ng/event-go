import React, { useState, useEffect, useContext } from 'react';
import {
  Center,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  Image,
  Text,
  Spacer,
  Accordion,
  AccordionButton,
  Box,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  Show,
  Hide,
  Heading,
  HStack,
  Button,
} from '@chakra-ui/react';
import Navbar from '../components/navbar/Navbar';
import BillingSettings from '../components/settings/BillingSettings';
import GeneralSettings from '../components/settings/GeneralSettings';
import PeopleSettings from '../components/settings/PeopleSettings';
import ProfileSettings from '../components/settings/ProfileSettings';
import SecuritySettings from '../components/settings/SecuritySettings';
import UserContext from '../context/UserContext';

function Settings() {
  const { user } = useContext(UserContext);
  const userInfo = user.attributes;
  console.table(userInfo);

  return (
    <Center flexDir="column">
      <Navbar />

      <Center my={'3em'} position="relative">
        {/* Background image */}
        <Image
          borderRadius={'10px'}
          maxH="25vh"
          w={{ base: '100vw', md: '80vw', xl: '75vw' }}
          src="https://images5.alphacoders.com/852/852883.jpg"
        />

        {/* Avatar and name */}
        <Center
          position={'absolute'}
          left={{ base: '50%', md: '0' }}
          bottom="0"
          transform={{
            base: 'translate(-50%, 55%)',
            md: 'translate(0, 80%)',
          }}
          flexDir={{ base: 'column', md: 'row' }}
          w="50%"
          gap={{ base: 0, md: '20px' }}
        >
          {/* Profile picture */}
          <Image
            borderRadius="50%"
            w={{ base: '80px', md: '120px' }}
            src={'https://avatars2.githubusercontent.com/u/37842853?v=4'}
            border="5px solid #171923"
          />

          {/* Profile name + friends button group */}
          <VStack
            ml={{ base: 0, md: 0 }}
            alignItems={{ base: 'center', md: 'flex-start' }}
            w="100%"
            h="100%"
          >
            <Spacer />
            <Heading fontSize={{ base: '1rem', md: '1.2rem' }}>
              {userInfo.name}
            </Heading>
            <Text>Your Settings</Text>
          </VStack>
        </Center>
      </Center>

      {/* Settings include:
      - General: allow notification, allow cookies, show 
      - Profile: profile details including names, username, phone number, age, location, etc.
      - Billing: saved payment methods, address,
      - Security: password
      - People
      */}

      <Stack w={{ base: '90%', md: '80%', xl: '75%' }} h="100%" mt="70px">
        <Hide below="md">
          <Tabs
            w="100%"
            variant="unstyled"
            colorScheme="messenger"
            orientation="vertical"
            h="90%"
          >
            <TabList w="30%" gap="15px">
              <Tab
                _selected={{
                  bg: 'gray.600',
                }}
                borderRadius="0 10px 10px 0"
                borderStyle="none none none solid"
                borderWidth="5px"
                borderColor="gray.600"
                background="gray.700"
              >
                General
              </Tab>
              <Tab
                _selected={{
                  bg: 'gray.600',
                }}
                borderRadius="0 10px 10px 0"
                borderStyle="none none none solid"
                borderWidth="5px"
                borderColor="gray.600"
                background="gray.700"
              >
                Profile
              </Tab>
              <Tab
                _selected={{
                  bg: 'gray.600',
                }}
                borderRadius="0 10px 10px 0"
                borderStyle="none none none solid"
                borderWidth="5px"
                borderColor="gray.600"
                background="gray.700"
              >
                Billing
              </Tab>
              <Tab
                _selected={{
                  bg: 'gray.600',
                }}
                borderRadius="0 10px 10px 0"
                borderStyle="none none none solid"
                borderWidth="5px"
                borderColor="gray.600"
                background="gray.700"
              >
                Security
              </Tab>
              <Tab
                _selected={{
                  bg: 'gray.600',
                }}
                borderRadius="0 10px 10px 0"
                borderStyle="none none none solid"
                borderWidth="5px"
                borderColor="gray.600"
                background="gray.700"
              >
                People
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel pt="0" pr="0">
                <GeneralSettings />
              </TabPanel>
              <TabPanel pt="0" pr="0">
                <ProfileSettings />
              </TabPanel>
              <TabPanel pt="0" pr="0">
                <BillingSettings />
              </TabPanel>
              <TabPanel pt="0" pr="0">
                <SecuritySettings />
              </TabPanel>
              <TabPanel pt="0" pr="0">
                <PeopleSettings />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Hide>

        <Show below="md">
          <Accordion allowToggle w="100%">
            <AccordionItem>
              <AccordionButton _expanded={{ bg: 'gray.700', color: 'white' }}>
                <Box as="span" flex="1" textAlign="left">
                  General
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel px={0} py="10px">
                <GeneralSettings />
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton _expanded={{ bg: 'gray.700', color: 'white' }}>
                <Box as="span" flex="1" textAlign="left">
                  Profile
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel px={0} py="10px">
                <ProfileSettings />
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton _expanded={{ bg: 'gray.700', color: 'white' }}>
                <Box as="span" flex="1" textAlign="left">
                  Billing
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel px={0} py="10px">
                <BillingSettings />
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton _expanded={{ bg: 'gray.700', color: 'white' }}>
                <Box as="span" flex="1" textAlign="left">
                  Security
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel px={0} py="10px">
                <SecuritySettings />
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton _expanded={{ bg: 'gray.700', color: 'white' }}>
                <Box as="span" flex="1" textAlign="left">
                  People
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel px={0} py="10px">
                <PeopleSettings />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Show>
      </Stack>

      <HStack
        w={{ base: '90vw', md: '80vw', xl: '75vw' }}
        pt={{ base: '10%', md: '30px' }}
      >
        <Button w="50%" colorScheme="green">
          Save
        </Button>
        <Button w="50%" variant="outline" colorScheme="red">
          Cancel
        </Button>
      </HStack>
    </Center>
  );
}

export default Settings;
