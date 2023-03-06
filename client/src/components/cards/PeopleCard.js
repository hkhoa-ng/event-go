import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Text,
  ButtonGroup,
  Button,
  CardBody,
  CardFooter,
  Stack,
  Image,
  Heading,
  Avatar,
  HStack,
  AvatarGroup,
} from '@chakra-ui/react';
import UserContext from '../../context/UserContext';

function PeopleCard({ fullname, username, email, friends, button }) {
  const { addFriendToUser, deleteFriendFromUser, allUsers, user } =
    useContext(UserContext);
  const currentUser = allUsers.find(u => u.email === user.attributes.email);
  const mutualFriends = currentUser.friends.filter(f => friends.includes(f));
  const [buttonText, setButtonText] = useState(button);

  const navigate = useNavigate();
  return (
    <Stack
      p="0"
      direction={{ base: 'row', md: 'column' }}
      alignItems={'space-around'}
      justifyContent={'space-around'}
    >
      <Image
        boxSize={{ base: '120px', md: '200px' }}
        src={'https://avatars2.githubusercontent.com/u/37842853?v=4'}
        alt="People profile picture"
        borderTopRightRadius={{ base: '0px', md: 'lg' }}
        borderTopLeftRadius="lg"
        borderBottomLeftRadius={{ base: 'lg', md: '0px' }}
        onClick={() => {
          console.log('Chick!');
          navigate(`/${username}`);
        }}
        _hover={{
          cursor: 'pointer',
        }}
      />
      <Stack mt="6" px="0">
        <Heading
          size="md"
          onClick={() => {
            console.log('Chick!');
            navigate(`/${username}`);
          }}
          _hover={{
            cursor: 'pointer',
          }}
        >
          {fullname}
        </Heading>
        <HStack>
          {mutualFriends.length > 0 && (
            <AvatarGroup size="sm" max={2}>
              {mutualFriends.map(f => (
                <Avatar
                  key={f}
                  name="Ryan Florence"
                  src="https://bit.ly/ryan-florence"
                />
              ))}
            </AvatarGroup>
          )}
          <Text size="sm" color="gray.400">
            {mutualFriends.length === 0 ? 'No' : mutualFriends.length} mutual
            friends
          </Text>
        </HStack>
        <ButtonGroup spacing="2" w="100%" size={{ base: 'sm', md: 'md' }}>
          <Button
            isDisabled={buttonText === button ? false : true}
            variant="solid"
            colorScheme="blue"
            w="100%"
            onClick={() => {
              if (button === 'Add friend') {
                addFriendToUser(user.attributes.email, email);
                setButtonText('Friend added!');
              } else if (button === 'Unfriend') {
                // TODO: unfriend user
                deleteFriendFromUser(user.attributes.email, email);
                setButtonText('Friend removed!');
              }
            }}
          >
            {buttonText}
          </Button>
          {/* <Button w="50%" variant="outline">
            Remove
          </Button> */}
        </ButtonGroup>
      </Stack>
    </Stack>
  );
}

export default PeopleCard;
