import React from 'react';
import {
  LinkBox,
  Image,
  Box,
  HStack,
  VStack,
  Heading,
  Text,
  IconButton,
  Divider,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Button,
  Spacer,
  Icon,
  Center,
  Flex,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FiMoreHorizontal, FiHeart } from 'react-icons/fi';
import { MdLocationOn } from 'react-icons/md';

function EventDetail(props) {
  const event = 'a-random-event';
  console.log(props);
  return (
    <Center>
      <VStack
        maxW={{ base: '100%', md: '90%', lg: '85%', xl: '80%' }}
        gap={0}
        position="static"
        mt={{ base: '0', md: 20 }}
        bg={{ base: 'none', md: 'gray.800' }}
        borderRadius={{ base: 0, md: 10 }}
      >
        {/* Mobile image */}
        <Image
          w={{ base: '100%', md: '50%' }}
          src={props.image}
          _after={{ content: {} }}
          display={{ base: 'flex', md: 'none' }}
        />
        <Box position="relative" maxW="80%" mt="0">
          {/* Mobile button */}
          <IconButton
            position="absolute"
            top="-0.5rem"
            transform={'translate(0, -50%)'}
            right={0}
            borderRadius="50%"
            variant="solid"
            colorScheme="telegram"
            icon={<FiHeart />}
            size="lg"
            display={{ base: 'flex', md: 'none' }}
          />

          <HStack
            mt={{ base: 10 }}
            alignItems="flex-start"
            mb={{ base: 5, md: 5, lg: 10 }}
          >
            {/* Medium and up image */}
            <Image
              w={{ base: '100%', md: '40%', xl: '45%' }}
              src={props.image}
              _after={{ content: {} }}
              display={{ base: 'none', md: 'flex' }}
              borderRadius="10px"
            />
            <VStack
              px={{ base: 0, md: 5, lg: 10 }}
              alignItems="flex-start"
              gap={{ base: 0, xl: 1 }}
            >
              <Heading
                fontSize={{ base: '2xl', lg: '3xl', xl: '4xl' }}
                fontWeight={'black'}
                p={0}
              >
                {props.event_name}
              </Heading>
              <HStack>
                <Icon
                  as={MdLocationOn}
                  fontSize={{ base: 'md', lg: 'xl', xl: '2xl' }}
                />
                <Text
                  fontSize={{ base: 'md', lg: 'lg', xl: 'xl' }}
                  fontWeight="light"
                  p={0}
                >
                  {props.location}, 19:00 09.10.2022
                </Text>
              </HStack>
              <Button
                display={{ base: 'none', md: 'flex' }}
                leftIcon={<FiHeart />}
                fontSize={{ md: 'md', lg: 'lg' }}
                colorScheme="telegram"
              >
                Follow this event
              </Button>
            </VStack>
          </HStack>

          {/* Information section */}
          <Divider />
          <Tabs defaultIndex={1} minW="100%" isFitted pb={10}>
            <TabList>
              <Tab fontSize={{ base: '0.8rem', md: '1rem' }}>Details</Tab>
              <Tab fontSize={{ base: '0.8rem', md: '1rem' }}>Ticket</Tab>
              <Tab fontSize={{ base: '0.8rem', md: '1rem' }}>Organizer</Tab>
              <Tab fontSize={{ base: '0.8rem', md: '1rem' }}>Friends</Tab>
            </TabList>
            <TabPanels>
              {/* Details */}
              <TabPanel>
                <Heading fontSize="xl" pt={5}>
                  The biggest event ever!
                </Heading>
                <Text fontSize="md" fontWeight="light">
                  {props.descriptions[0]}.
                </Text>
                <Heading fontSize="xl" pt={5}>
                  Random description!
                </Heading>
                <Text fontSize="md" fontWeight="light" p={0}>
                  Nulla tempor aliqua deserunt in eu amet ullamco ea adipisicing
                  dolore commodo. Ullamco sunt mollit cillum esse est Lorem
                  officia enim aliqua in aute pariatur aliquip enim. Non enim
                  cillum qui adipisicing consectetur adipisicing in. Cillum
                  incididunt consequat do nulla excepteur eiusmod et voluptate
                  nostrud dolor esse et consectetur eiusmod. Ex duis eu ipsum
                  consectetur ea nulla in.
                </Text>
              </TabPanel>

              {/* Tickets */}
              <TabPanel>
                <VStack align="left" gap={2}>
                  <HStack gap={0}>
                    <Text>
                      <b>Adults,</b> 15 euros
                    </Text>
                    <Spacer />

                    {/* Ticket number selector */}
                    <NumberInput
                      defaultValue={0}
                      max={5}
                      min={0}
                      clampValueOnBlur={false}
                      maxW="20%"
                      size={{ base: 'sm', md: 'md' }}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>

                    <Button size={{ base: 'sm', md: 'md' }}>Buy</Button>
                  </HStack>
                  <Text>
                    This ticket includes a free drink and a free snack.
                    Guarantee fun!
                  </Text>

                  <HStack gap={0} pt={5}>
                    <Text>
                      <b>Children under 18,</b> free
                    </Text>
                    <Spacer />

                    {/* Ticket number selector */}
                    <NumberInput
                      defaultValue={0}
                      max={5}
                      min={0}
                      clampValueOnBlur={false}
                      maxW="20%"
                      size={{ base: 'sm', md: 'md' }}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>

                    <Button size={{ base: 'sm', md: 'md' }}>Buy</Button>
                  </HStack>
                  <Text>
                    Free ticket fee for children under 18 years old! Bring your
                    kids along!
                  </Text>
                </VStack>
              </TabPanel>

              {/* Organizer */}
              <TabPanel>
                <Heading fontSize="xl" pt={5}>
                  Oranizer email
                </Heading>
                <Text>{props.organizer_email}</Text>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </VStack>
    </Center>
  );
}

export default EventDetail;
