import React, { useContext } from 'react';
import {
  Image,
  Text,
  Divider,
  Stack,
  VStack,
  Spacer,
  HStack,
  Input,
  Box,
  Button,
  IconButton,
  Show,
  Hide,
  Link,
  useToast,
} from '@chakra-ui/react';
import { FaTrashAlt } from 'react-icons/fa';
import ShoppingCartContext from '../../context/ShoppingCartContext';
import { Link as ReactLink } from 'react-router-dom';

function ShoppingCartCard({
  eventName,
  ticketType,
  eventId,
  image,
  price,
  quantity,
}) {
  const { addOneToCart, removeOneFromCart, removeTicketsFromCart } =
    useContext(ShoppingCartContext);

  const toast = useToast();

  return (
    <Stack direction="column" gap="10px">
      <Divider />
      <Stack
        direction="row"
        gap="10px"
        alignItems={{ base: 'space-between', md: 'center' }}
      >
        <Box width={{ base: '30%', xl: '20%' }}>
          <Image
            boxSize="100%"
            objectFit="cover"
            // maxH="100%"
            borderRadius={5}
            src={image}
          />
        </Box>

        {/* Left group */}
        <VStack
          alignItems="flex-start"
          //   bg="teal.800"
          justifyContent="space-between"
        >
          <Link
            as={ReactLink}
            to={`/${eventId}`}
            fontSize={{ base: '1rem', md: '1.5rem' }}
          >
            {eventName}
          </Link>
          <Text fontWeight="light" color="gray.400">
            {ticketType} x {quantity} | ${price}
          </Text>

          <HStack gap="0" maxW="300px">
            <Button
              onClick={() => {
                addOneToCart(eventName, ticketType);
              }}
              size={{ base: 'sm', md: 'md' }}
            >
              +
            </Button>
            <Input
              readOnly
              value={quantity}
              size={{ base: 'sm', md: 'md' }}
              w="35%"
              textAlign="center"
            />
            <Button
              onClick={() => {
                removeOneFromCart(eventName, ticketType);
              }}
              size={{ base: 'sm', md: 'md' }}
            >
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
            ${price * quantity}
          </Text>
          <Hide above="md">
            <IconButton
              size={{ base: 'sm', md: 'md' }}
              icon={<FaTrashAlt />}
              colorScheme="red"
              variant="outline"
              display={{ base: 'flex', md: 'none' }}
              onClick={() => {
                toast({
                  title: 'Tickets removed!',
                  description: `Removed ${quantity} ${ticketType} tickets of ${eventName} from cart.`,
                  status: 'warning',
                  position: 'top-right',
                  isClosable: 'true',
                  duration: 4000,
                });
                removeTicketsFromCart(eventName, ticketType);
              }}
            />
          </Hide>

          <Show above="md">
            <Button
              size={{ base: 'sm', md: 'md' }}
              leftIcon={<FaTrashAlt />}
              colorScheme="red"
              variant="outline"
              onClick={() => {
                toast({
                  title: 'Tickets removed!',
                  description: `Removed ${quantity} ${ticketType} tickets of ${eventName} from cart.`,
                  status: 'warning',
                  position: 'top-right',
                  isClosable: 'true',
                  duration: 4000,
                });
                removeTicketsFromCart(eventName, ticketType);
              }}
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
