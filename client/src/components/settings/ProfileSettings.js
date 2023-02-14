import React, { forwardRef, useState, useEffect, useContext } from 'react';
import {
  Stack,
  Heading,
  Text,
  HStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  ButtonGroup,
  IconButton,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
} from '@chakra-ui/react';
import { FiEdit } from 'react-icons/fi';
import SingleFieldInput from '../inputs/SingleFieldInput';
import UserContext from '../../context/UserContext';

function ProfileSettings() {
  const { user } = useContext(UserContext);
  const userInfo = user.attributes;
  // Handle Name change
  const {
    isOpen: isNameOpen,
    onOpen: onNameOpen,
    onClose: onNameClose,
  } = useDisclosure();
  const [nameValue, setNameValue] = React.useState(userInfo.name);
  const [name, setName] = useState(userInfo.name);

  // Handle Email change
  const {
    isOpen: isEmailOpen,
    onOpen: onEmailOpen,
    onClose: onEmailClose,
  } = useDisclosure();
  const [emailValue, setEmailValue] = React.useState(userInfo.email);
  const [email, setEmail] = useState(userInfo.email);

  return (
    <Stack px="15px">
      <Heading
        fontSize={{ base: '1rem', md: '1.5rem' }}
        display={{ base: 'none', md: 'flex' }}
        pb="20px"
      >
        Profile Settings
      </Heading>

      {/* Username */}
      <SingleFieldInput
        label="Username"
        defaultValue={userInfo.preferred_username}
        type="text"
        placeholder="username"
      />

      {/* Full name */}
      <SingleFieldInput
        label="Full name"
        defaultValue={userInfo.name}
        type="text"
        placeholder="John Smith"
      />

      {/* Email */}
      <SingleFieldInput
        label="Email"
        defaultValue={userInfo.email}
        type="email"
        placeholder="first.last@examlple.com"
      />

      {/* Phone Number */}
      <SingleFieldInput
        label="Phone number"
        defaultValue={userInfo.phone_number}
        type="tel"
        placeholder="(+01) 123456789"
      />
    </Stack>
  );
}

export default ProfileSettings;
