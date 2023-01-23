import React from 'react';
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

function Cart() {
  return (
    <Center flexDir="column" bg="gray.800">
      <Navbar username={'hkhoa'} name="Khoa Nguyen" />

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
            <ShoppingCartCard />
            <ShoppingCartCard />
            <ShoppingCartCard />
            <ShoppingCartCard />
            <ShoppingCartCard />
            <ShoppingCartCard />
            <ShoppingCartCard />
            <ShoppingCartCard />
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
            <Text fontWeight="light" color="gray.400">
              20% discount
            </Text>
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
                $39.98
              </Text>
            </HStack>
            {/* Discount */}
            <HStack justifyContent="space-between" w="100%">
              <Text fontWeight="light" textAlign="right">
                Discount
              </Text>
              <Text fontWeight="light" textAlign="right">
                (-20%) - $7.89
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
                + $8.00
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
                $40.17
              </Text>
            </HStack>
          </VStack>

          <Button colorScheme="messenger">Proceed to checkout</Button>
          <Button>Continue shopping</Button>
        </Stack>
      </Stack>
    </Center>
  );
}

export default Cart;
