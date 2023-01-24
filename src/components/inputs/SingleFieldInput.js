import React, { useState, useEffect } from 'react';
import {
  HStack,
  Text,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  FormLabel,
  Input,
  Button,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
  Spacer,
} from '@chakra-ui/react';
import { FiEdit } from 'react-icons/fi';

function SingleFieldInput({ label, defaultValue, type, placeholder }) {
  const [inputValue, setInputValue] = useState();
  const [value, setValue] = useState(defaultValue);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HStack gap="20px" w="100%">
      <Text>
        {label}: {value}
      </Text>
      <Spacer />
      <IconButton
        onClick={onOpen}
        size="sm"
        colorScheme="green"
        icon={<FiEdit />}
      />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={{ base: 'xs', md: 'md' }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update your {label}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel>Enter new {label}</FormLabel>
            <Input
              placeholder={placeholder}
              //   value={value}
              onChange={event => setInputValue(event.target.value)}
              type={type}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              onClick={() => {
                setValue(inputValue);
                onClose();
              }}
            >
              Update
            </Button>
            <Button colorScheme="red" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </HStack>
  );
}

export default SingleFieldInput;
