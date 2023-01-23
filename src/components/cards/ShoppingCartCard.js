import React from 'react';
import {
  Image,
  Text,
  Divider,
  Stack,
  VStack,
  Spacer,
  HStack,
  Input,
  useNumberInput,
  Button,
  IconButton,
  Show,
  Hide,
} from '@chakra-ui/react';
import { FaTrashAlt } from 'react-icons/fa';

function ShoppingCartCard() {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 0,
      max: 99,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <Stack direction="column" gap="10px">
      <Divider />
      <Stack direction="row" gap="10px">
        <Image
          w={{ base: '30%', xl: '20%' }}
          maxH="100%"
          borderRadius={5}
          src="https://images.unsplash.com/photo-1516981442399-a91139e20ff8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        />
        {/* Left group */}
        <VStack
          alignItems="flex-start"
          //   bg="teal.800"
          justifyContent="space-between"
        >
          <Text fontSize={{ base: '1rem', md: '1.5rem' }}>Cool event name</Text>
          <Text fontWeight="light" color="gray.400">
            $12.99 | Available
          </Text>

          <HStack gap="0" maxW="300px">
            <Button {...inc} size={{ base: 'sm', md: 'md' }}>
              +
            </Button>
            <Input
              {...input}
              size={{ base: 'sm', md: 'md' }}
              w="25%"
              textAlign="center"
            />
            <Button {...dec} size={{ base: 'sm', md: 'md' }}>
              -
            </Button>
          </HStack>
        </VStack>

        <Spacer />

        {/* Right group */}
        <VStack
          alignItems="flex-end"
          //   bg="teal.800"
          justifyContent="space-between"
        >
          <Text
            fontWeight="bold"
            fontSize={{ base: '1rem', md: '1.5rem' }}
            textAlign="right"
          >
            $12.99
          </Text>
          <Hide above="md">
            <IconButton
              size={{ base: 'sm', md: 'md' }}
              icon={<FaTrashAlt />}
              colorScheme="red"
              variant="outline"
              display={{ base: 'flex', md: 'none' }}
            />
          </Hide>

          <Show above="md">
            <Button
              size={{ base: 'sm', md: 'md' }}
              leftIcon={<FaTrashAlt />}
              colorScheme="red"
              variant="outline"
            >
              Remove
            </Button>
          </Show>
        </VStack>
      </Stack>
    </Stack>
  );
}

export default ShoppingCartCard;
