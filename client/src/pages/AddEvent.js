import React, { useContext, useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import {
  Center,
  Stack,
  Heading,
  VStack,
  Input,
  Button,
  HStack,
  Text,
  Textarea,
  Divider,
  Spacer,
} from '@chakra-ui/react';
import InviteFriendsInput from '../components/inputs/InvitedFriendsInput';
import EventContext from '../context/EventContext';
import EventTagsInput from '../components/inputs/EventTagsInput';

function AddEvent() {
  const { availableTags } = useContext(EventContext);
  const availableFriends = [
    'John Smith',
    'Jane Doe',
    'An Nguyen',
    'Jadon Stuart',
    'Steven Buitrago',
    'Cuong Nguyen',
    'Chi Nguyen',
    'Nhi Tran',
    'Duy Vu',
    'Nam Anh',
    'The Anh',
  ];

  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  const [eventTags, setEventTags] = useState([]);
  const [invitedFriends, setInvitedFriends] = useState([]);

  const createNewEventObject = () => {
    const date = new Date(eventDate);
    const newEventObject = {
      eventName: eventName,
      organizerEmail: 'e@org.com',
      eventTime: date.toISOString(),
      location: eventLocation,
      image: 'https://shrtco.de/lTxhxR',
      description: [eventDescription, eventDetails],
      tags: eventTags,
      invitedFriends: invitedFriends,
    };
    console.table(newEventObject);
    return newEventObject;
  };

  return (
    <Center flexDir="column">
      <Navbar username={'hkhoa'} name="Khoa Nguyen" />
      <Spacer />
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        my={'5em'}
        w="90%"
        gap={{ base: '25px', lg: '5%' }}
      >
        {/* Event metadata */}
        <Stack
          gap="20px"
          w="100%"
          alignItems={{ base: 'center', lg: 'flex-start' }}
          //   direction={{base: "column", md: "row"}}
        >
          <Heading
            fontSize={{ base: '1.5rem', md: '2rem' }}
            textAlign={{ base: 'center', lg: 'left' }}
          >
            Add New Event
          </Heading>

          <Stack w="100%" gap="2%" direction={{ base: 'column', lg: 'row' }}>
            <VStack
              w={{ base: '100%', lg: '47.5%' }}
              alignItems="left"
              h="100%"
            >
              {/* <InputGroup>
                <InputLeftAddon children="Name" /> */}
              <Text fontWeight="semibold" pt="15px">
                Event Name
              </Text>
              <Input
                type="text"
                placeholder="Very exciting event!"
                variant="flushed"
                value={eventName}
                onChange={e => setEventName(e.target.value)}
              />
              {/* </InputGroup> */}
              <Text fontWeight="semibold" pt="15px">
                Description (optional)
              </Text>
              <Input
                type="text"
                placeholder="Short description of the event"
                variant="flushed"
                value={eventDescription}
                onChange={e => setEventDescription(e.target.value)}
              />

              <Text fontWeight="semibold" pt="15px">
                Date & Time
              </Text>
              <Input
                type="datetime-local"
                placeholder="Select Data and Time"
                variant="flushed"
                value={eventDate}
                onChange={e => setEventDate(e.target.value)}
              />

              <Text fontWeight="semibold" pt="15px">
                Location
              </Text>
              <Input
                type="text"
                placeholder="Location of the event"
                variant="flushed"
                value={eventLocation}
                onChange={e => setEventLocation(e.target.value)}
              />
              <EventTagsInput
                availableTags={availableTags}
                selectedTags={eventTags}
                setSelectedTags={setEventTags}
              />
            </VStack>
            <Divider orientation="vertical" />

            <VStack
              w={{ base: '100%', lg: '47.5%' }}
              alignItems="left"
              py={{ base: '20px', md: '0px' }}
            >
              <Text fontWeight="semibold">Event Details (optional)</Text>
              <Textarea
                resize="none"
                w="100%"
                placeholder="More details of the event..."
                value={eventDetails}
                onChange={e => setEventDetails(e.target.value)}
              />

              <InviteFriendsInput
                availableFriends={availableFriends}
                invitedFriends={invitedFriends}
                setInvitedFriends={setInvitedFriends}
              />
            </VStack>
          </Stack>

          <Divider />
          <HStack w="100%">
            <Spacer />
            <Button
              w={{ base: '50%' }}
              colorScheme="green"
              onClick={() => {
                createNewEventObject();
              }}
            >
              Add Event
            </Button>
            <Spacer />
            <Button w={{ base: '50%' }} colorScheme="red" variant="outline">
              Cancel
            </Button>
            <Spacer />
          </HStack>
        </Stack>
      </Stack>
      <Spacer />
    </Center>
  );
}

export default AddEvent;
