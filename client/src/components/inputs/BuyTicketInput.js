import React, { useState, useContext } from 'react';
import {
  useToast,
  VStack,
  Text,
  Spacer,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Divider,
  HStack,
  Button,
} from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import ShoppingCartContext from '../../context/ShoppingCartContext';

function BuyTicketInput({ eventName, image, eventId, ticket }) {
  const toast = useToast();
  const [ticketQuantity, setTicketQuantity] = useState(0);
  const { addToCart } = useContext(ShoppingCartContext);

  const handleAddToCart = (eventName, ticketType, price, quantity) => {
    addToCart(eventName, ticketType, price, quantity);
  };

  return (
    <VStack key={nanoid()} w="100%" alignItems="space-between">
      <HStack gap={0}>
        <Text>
          <b>{ticket.ticket_type},</b> {ticket.price} euros
        </Text>
        <Spacer />

        {/* Ticket number selector */}
        <NumberInput
          defaultValue={0}
          min={0}
          keepWithinRange={true}
          clampValueOnBlur={false}
          maxW="20%"
          size={{ base: 'sm', md: 'md' }}
          onChange={value => setTicketQuantity(value)}
          value={ticketQuantity}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        <Button
          size={{ base: 'sm', md: 'md' }}
          colorScheme="green"
          onClick={() => {
            toast({
              position: 'top-right',
              title: 'Added to Cart!',
              description: `Added ${ticketQuantity} ${ticket.ticket_type} tickets for ${eventName} to shopping cart.`,
              status: 'success',
              duration: 4000,
              isClosable: true,
            });
            // console.log(
            //   `Ticket for ${ticket.ticket_type} with ${ticketQuantity}`
            // );
            addToCart(
              eventName,
              image,
              eventId,
              ticket.ticket_type,
              Number(ticket.price),
              Number(ticketQuantity)

              //   eventName,
              //   ticket.ticket_type,
              //   Number(ticket.price),
              //   Number(ticketQuantity)
            );
          }}
        >
          Add to cart
        </Button>
      </HStack>
      <Text>{ticket.description}</Text>
      <Divider />
    </VStack>
  );
}

export default BuyTicketInput;
