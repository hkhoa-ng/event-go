import React from 'react';
import { HStack, Avatar, Text, IconButton } from '@chakra-ui/react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

function FriendCard({ button }) {
  return (
    <HStack
      height="60px"
      p="10px"
      borderRadius="10px"
      borderWidth="2px"
      borderColor="gray.600"
      justifyContent="space-around"
    >
      <Avatar size="sm" />
      <Text>Marilyn Smith James</Text>
      {button}
    </HStack>
  );
}

export default FriendCard;
