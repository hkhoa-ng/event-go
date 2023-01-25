import React, { forwardRef, useState, useEffect } from 'react';
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

function ProfileSettings() {
  // Handle Name change
  const {
    isOpen: isNameOpen,
    onOpen: onNameOpen,
    onClose: onNameClose,
  } = useDisclosure();
  const [nameValue, setNameValue] = React.useState('Khoa Nguyen');
  const [name, setName] = useState('Khoa Nguyen');

  // Handle ...... change
  const {
    isOpen: isEmailOpen,
    onOpen: onEmailOpen,
    onClose: onEmailClose,
  } = useDisclosure();
  const [emailValue, setEmailValue] = React.useState('khoa.nguyen@example.com');
  const [email, setEmail] = useState('khoa.nguyen@example.com');

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
        defaultValue="nhkhoa"
        type="text"
        placeholder="username"
      />

      {/* Full name */}
      <SingleFieldInput
        label="Full name"
        defaultValue="Khoa Nguyen"
        type="text"
        placeholder="John Smith"
      />

      {/* Email */}
      <SingleFieldInput
        label="Email"
        defaultValue="khoa.nguyen@example.com"
        type="email"
        placeholder="first.last@examlple.com"
      />

      {/* Phone Number */}
      <SingleFieldInput
        label="Phone number"
        defaultValue="(+358) 123237746"
        type="tel"
        placeholder="(+01) 123456789"
      />
    </Stack>
  );
}

export default ProfileSettings;
