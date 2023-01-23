import React from 'react';
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
  Box,
  SimpleGrid,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Radio,
} from '@chakra-ui/react';
import { BsPersonPlusFill } from 'react-icons/bs';
import FriendCard from '../components/cards/FriendCard';
import { AiOutlineCloseCircle } from 'react-icons/ai';

function AddEvent() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Center flexDir="column" bg="gray.800" h={{ lg: '100vh' }}>
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
              />
              {/* </InputGroup> */}
              <Text fontWeight="semibold" pt="15px">
                Description
              </Text>
              <Input
                type="text"
                placeholder="Short description of the event"
                variant="flushed"
              />

              <Text fontWeight="semibold" pt="15px">
                Date & Time
              </Text>
              <Input
                type="datetime-local"
                placeholder="Select Data and Time"
                variant="flushed"
              />

              <Text fontWeight="semibold" pt="15px">
                Location
              </Text>
              <Input
                type="text"
                placeholder="Location of the event"
                variant="flushed"
              />
            </VStack>
            <Divider orientation="vertical" />

            <VStack
              w={{ base: '100%', lg: '47.5%' }}
              alignItems="left"
              py={{ base: '20px', md: '0px' }}
            >
              <Text fontWeight="semibold">Event Details</Text>
              <Textarea
                resize="none"
                w="100%"
                placeholder="More details of the event..."
              />

              <Text pt="15px" fontWeight="semibold">
                Friends Attending
              </Text>
              <Box
                overflowY="auto"
                maxH="30vh"
                pr="15px"
                sx={{
                  '::-webkit-scrollbar': {
                    width: '10px',
                  },
                  '::-webkit-scrollbar-thumb': {
                    background: 'gray.700',
                    borderRadius: '5px',
                  },
                  // '::-webkit-scrollbar-track': {
                  //   background: 'gray.900',
                  // },
                }}
              >
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} py="10px">
                  <FriendCard
                    button={
                      <IconButton
                        size="sm"
                        variant="ghost"
                        fontSize="1.5rem"
                        icon={<AiOutlineCloseCircle />}
                      />
                    }
                  />
                  <FriendCard
                    button={
                      <IconButton
                        size="sm"
                        variant="ghost"
                        fontSize="1.5rem"
                        icon={<AiOutlineCloseCircle />}
                      />
                    }
                  />
                  <FriendCard
                    button={
                      <IconButton
                        size="sm"
                        variant="ghost"
                        fontSize="1.5rem"
                        icon={<AiOutlineCloseCircle />}
                      />
                    }
                  />
                  <FriendCard
                    button={
                      <IconButton
                        size="sm"
                        variant="ghost"
                        fontSize="1.5rem"
                        icon={<AiOutlineCloseCircle />}
                      />
                    }
                  />
                  <FriendCard
                    button={
                      <IconButton
                        size="sm"
                        variant="ghost"
                        fontSize="1.5rem"
                        icon={<AiOutlineCloseCircle />}
                      />
                    }
                  />
                </SimpleGrid>
              </Box>
              <Button
                colorScheme="messenger"
                textAlign="left"
                leftIcon={<BsPersonPlusFill />}
                onClick={onOpen}
              >
                Invite friend
              </Button>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Friends</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Box
                      overflowY="auto"
                      maxH="30vh"
                      pr="15px"
                      sx={{
                        '::-webkit-scrollbar': {
                          width: '10px',
                        },
                        '::-webkit-scrollbar-thumb': {
                          background: 'gray.600',
                          borderRadius: '5px',
                        },
                        // '::-webkit-scrollbar-track': {
                        //   background: 'gray.900',
                        // },
                      }}
                    >
                      <SimpleGrid columns={1} spacing={5} py="10px">
                        <FriendCard button={<Radio type="checkbox" />} />
                        <FriendCard button={<Radio type="checkbox" />} />
                        <FriendCard button={<Radio type="checkbox" />} />
                        <FriendCard button={<Radio type="checkbox" />} />
                        <FriendCard button={<Radio type="checkbox" />} />
                      </SimpleGrid>
                    </Box>
                  </ModalBody>

                  <ModalFooter>
                    <HStack w="100%" justifyContent="space-around">
                      <Button colorScheme="green" onClick={onClose}>
                        Add Selected
                      </Button>
                      <Button
                        colorScheme="red"
                        variant="ghost"
                        mr={3}
                        onClick={onClose}
                      >
                        Cancel
                      </Button>
                    </HStack>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </VStack>
          </Stack>

          <Divider />
          <HStack w="100%">
            <Spacer />
            <Button w={{ base: '50%' }} colorScheme="green">
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
