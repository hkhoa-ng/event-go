import {
  Container,
  Box,
  Avatar,
  Button,
  HStack,
  VStack,
  Image,
  Input,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Link,
  MenuDivider,
  useColorModeValue,
  Heading,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

const IconButton = ({ children }) => {
  return (
    <Button
      padding="0.4rem"
      width="auto"
      height="auto"
      borderRadius="100%"
      bg="transparent"
      _hover={{ bg: '#f6f6f6' }}
    >
      {children}
    </Button>
  );
};

const Navbar = props => {
  return (
    <Box
      py="2"
      boxShadow="sm"
      border="0 solid #e5e7eb"
      position="fixed"
      top="0"
      bg="coolBlack.700"
      width="100%"
      zIndex="1"
    >
      <Container maxW="1280px" px={4} mx="auto">
        <HStack>
          <Link href={`/`} _hover={{ textDecoration: 'none' }}>
            <Image
              alt="Event-Go logo"
              w={'auto'}
              h={4}
              src="./images/logo.svg"
            />
          </Link>
          <Spacer />
          <Input
            maxW={{ base: '15rem', md: '25rem', lg: '35rem' }}
            placeholder="Find events, people, places..."
            borderColor="creamWhite"
            borderRadius="5px"
          />
          <Spacer />
          <HStack spacing={3}>
            <Button
              color="coolBlack.700"
              rounded="md"
              bg="mandarin.200"
              _hover={{ bg: 'mandarin.600' }}
              display={{ base: 'none', md: 'block' }}
            >
              Add an event
            </Button>
            <Menu isLazy>
              <MenuButton as={Button} size="sm" px={0} py={0} rounded="full">
                <Avatar
                  size="sm"
                  src={'https://avatars2.githubusercontent.com/u/37842853?v=4'}
                />
              </MenuButton>
              <MenuList
                zIndex={5}
                border="2px solid"
                borderColor={useColorModeValue('gray.700', 'gray.100')}
                boxShadow="4px 4px 0"
              >
                <Link
                  href={`/${props.username}`}
                  _hover={{ textDecoration: 'none' }}
                >
                  <MenuItem>
                    <VStack justify="start" alignItems="left">
                      <Text fontWeight="500">{props.name}</Text>
                      <Text size="sm" color="gray.500" mt="0 !important">
                        @{props.username}
                      </Text>
                    </VStack>
                  </MenuItem>
                </Link>
                <MenuDivider />
                <Link href={`/`} _hover={{ textDecoration: 'none' }}>
                  <MenuItem>
                    <Text fontWeight="500">Home</Text>
                  </MenuItem>
                </Link>
                <Link href={`/cart`} _hover={{ textDecoration: 'none' }}>
                  <MenuItem>
                    <Text fontWeight="500">Shopping Cart</Text>
                  </MenuItem>
                </Link>
                <Link href={`/settings`} _hover={{ textDecoration: 'none' }}>
                  <MenuItem>
                    <Text fontWeight="500">Settings</Text>
                  </MenuItem>
                </Link>
                <MenuDivider />
                <MenuItem>
                  <Text fontWeight="500">Sign Out</Text>
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};

export default Navbar;
