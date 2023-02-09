import {
  VStack,
  Box,
  SimpleGrid,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  HStack,
  useDisclosure,
  Avatar,
  Text,
} from '@chakra-ui/react';
import { AiOutlineClose } from 'react-icons/ai';
import { IoMdAdd } from 'react-icons/io';
import { BsPersonPlusFill } from 'react-icons/bs';

const FriendCard = ({ button, name }) => {
  return (
    <HStack
      height="60px"
      py="10px"
      px="20px"
      borderRadius="10px"
      borderWidth="2px"
      borderColor="gray.600"
      justifyContent="space-between"
      w="100%"
    >
      <Avatar size="sm" />
      <Text>{name}</Text>
      {button}
    </HStack>
  );
};

const InviteFriendsInput = ({
  availableFriends,
  invitedFriends,
  setInvitedFriends,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleInviteFriend = friend => {
    setInvitedFriends([...invitedFriends, friend]);
  };

  const handleRemoveFriend = friend => {
    setInvitedFriends(invitedFriends.filter(f => f !== friend));
  };

  return (
    <VStack pt="5">
      <Button
        colorScheme="messenger"
        textAlign="left"
        leftIcon={<BsPersonPlusFill />}
        onClick={onOpen}
        width="100%"
      >
        Invite friends to your event
      </Button>
      <Box
        justifyContent="center"
        alignItems="center"
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
        w="100%"
      >
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} py="10px" w="100%">
          {invitedFriends.map(friend => (
            <FriendCard
              key={friend}
              button={
                <IconButton
                  size="sm"
                  variant="ghost"
                  fontSize="1.5rem"
                  icon={<AiOutlineClose />}
                  onClick={() => handleRemoveFriend(friend)}
                />
              }
              name={friend}
            />
          ))}
        </SimpleGrid>
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
        size={{ base: 'xs', md: 'lg' }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Available friends</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              overflowY="auto"
              maxH="50vh"
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
                {!availableFriends.every(friend =>
                  invitedFriends.includes(friend)
                ) ? (
                  availableFriends.map(friend => {
                    if (!invitedFriends.includes(friend)) {
                      return (
                        <FriendCard
                          key={friend}
                          button={
                            <IconButton
                              color="gray.200"
                              size="sm"
                              variant="ghost"
                              fontSize="1.5rem"
                              icon={<IoMdAdd />}
                              onClick={() => handleInviteFriend(friend)}
                            />
                          }
                          name={friend}
                        />
                      );
                    }
                  })
                ) : (
                  <Text>No available friends to invite!</Text>
                )}
              </SimpleGrid>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default InviteFriendsInput;
