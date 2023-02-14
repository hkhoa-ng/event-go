import React, { useState, useContext, useEffect } from 'react';
import {
  Center,
  Heading,
  Divider,
  Stack,
  Text,
  InputGroup,
  Input,
  InputLeftElement,
  VStack,
  Button,
  HStack,
  Box,
} from '@chakra-ui/react';
import Navbar from '../components/navbar/Navbar';
import ShoppingCartCard from '../components/cards/ShoppingCartCard';
import { HiOutlineMail } from 'react-icons/hi';
import StripeCheckoutButton from '../components/stripeCheckoutButton/stripeCheckoutButton';
import ShoppingCartContext from '../context/ShoppingCartContext';
import { nanoid } from 'nanoid';

function Cart() {
  const { shoppingCartTickets, getTotalPrice } =
    useContext(ShoppingCartContext);
  const [total, setTotal] = useState(getTotalPrice());

  useEffect(() => {
    setTotal(getTotalPrice());
  }, [shoppingCartTickets]);

  return (
    <Center flexDir="column">
      <Navbar />

      <Stack
        direction={{ base: 'column', lg: 'row' }}
        my={'5em'}
        w="90%"
        gap={{ base: '25px', lg: '5%' }}
      >
        {/* Cart items section */}
        <Stack gap="10px" w={{ base: '100%', lg: '62.5%' }}>
          <Heading
            fontSize={{ base: '1.5rem', md: '2rem' }}
            textAlign={{ base: 'center', lg: 'left' }}
          >
            Your Shopping Cart
          </Heading>

          <Stack
            gap="10px"
            overflowY="auto"
            maxH="70vh"
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
            {shoppingCartTickets.length > 0 ? (
              shoppingCartTickets.map(ticket => {
                return (
                  <ShoppingCartCard
                    key={nanoid()}
                    eventName={ticket.eventName}
                    ticketType={ticket.ticketType}
                    image={ticket.image}
                    eventId={ticket.eventId}
                    price={ticket.price}
                    quantity={ticket.quantity}
                  />
                );
              })
            ) : (
              <Text>Your cart is empty!</Text>
            )}
          </Stack>

          <Divider />
        </Stack>

        {/* Checkout section */}
        <Stack gap="10px" w={{ base: '100%', lg: '32.5%' }}>
          <Heading
            fontSize={{ base: '1.5rem', md: '2rem' }}
            textAlign={{ base: 'center', lg: 'left' }}
          >
            Check Out
          </Heading>
          <Divider />

          {/* Email */}
          <VStack align="flex-start" gap="10px">
            <Text>Email Address for Delivery</Text>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<HiOutlineMail />}
              />
              <Input type="email" placeholder="example@email.com" />
            </InputGroup>
            <Divider />
          </VStack>

          {/* Promotion code */}
          <VStack align="flex-start">
            <HStack w="100%">
              <Input type="text" placeholder="Promotion code" />
              <Button>Apply</Button>
            </HStack>
            {/* <Text fontWeight="light" color="gray.400">
              20% discount
            </Text> */}
            <Divider pt="10px" />
          </VStack>

          {/* Subtotal */}
          <VStack align="flex-start" w="100%">
            {/* Subtotal */}
            <HStack justifyContent="space-between" w="100%">
              <Text
                fontSize={{ base: '1.2rem', md: '1.5rem' }}
                textAlign="right"
              >
                Subtotal
              </Text>
              <Text
                fontSize={{ base: '1.2rem', md: '1.5rem' }}
                textAlign="right"
              >
                ${total.toFixed(2)}
              </Text>
            </HStack>
            {/* Discount */}
            <HStack justifyContent="space-between" w="100%">
              <Text fontWeight="light" textAlign="right">
                Discount
              </Text>
              <Text fontWeight="light" textAlign="right">
                {/* (-20%) - $7.89 */}- $0.00
              </Text>
            </HStack>
            {/* Delivery */}
            <HStack justifyContent="space-between" w="100%">
              <Text fontWeight="light" textAlign="right">
                Delivery
              </Text>
              <Text fontWeight="light" textAlign="right">
                (Email) + $0.00
              </Text>
            </HStack>
            {/* Tax */}
            <HStack justifyContent="space-between" w="100%">
              <Text fontWeight="light" textAlign="right">
                Tax
              </Text>
              <Text fontWeight="light" textAlign="right">
                + $0.00
              </Text>
            </HStack>
            <Divider pt="10px" />
          </VStack>

          {/* Total */}
          <VStack align="flex-start" w="100%">
            <HStack justifyContent="space-between" w="100%">
              <Text
                fontSize={{ base: '1.2rem', md: '1.5rem' }}
                textAlign="right"
              >
                Total
              </Text>
              <Text
                fontWeight="bold"
                fontSize={{ base: '1.2rem', md: '1.5rem' }}
                textAlign="right"
              >
                ${total.toFixed(2)}
              </Text>
            </HStack>
          </VStack>
          <div className="test-warning">
            *Please use the following test credit card for payments* <br />
            4242 4242 4242 4242 - Exp: 01/50 - CVV: 123
          </div>
          <StripeCheckoutButton price={total} />
          {/* <Button colorScheme="messenger">Proceed to checkout</Button> */}
          <Button>Continue shopping</Button>
        </Stack>
      </Stack>
    </Center>
  );
}

export default Cart;
