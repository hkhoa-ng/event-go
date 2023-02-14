import React, { useContext } from 'react';
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
  MenuDivider,
  InputGroup,
  InputLeftElement,
  IconButton,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaSearch, FaPrint, FaPlus, FaSignInAlt } from 'react-icons/fa';
import UserContext from '../../context/UserContext';

const Navbar = () => {
  const { user, signOut } = useContext(UserContext);

  const name = user.attributes.name;
  const username = user.attributes.preferred_username;

  return (
    <Box
      py="2"
      boxShadow="sm"
      border="0 solid #e5e7eb"
      position="fixed"
      top="0"
      bg="brand.600"
      width="100%"
      zIndex="10"
    >
      {/* <Button
        onClick={() => {
          console.table(user.attributes);
        }}
      >
        Print user
      </Button> */}
      <Container minW="90%" px={4} mx="auto">
        <HStack>
          <Link to={`/`} _hover={{ textDecoration: 'none' }}>
            <Image
              alt="Event-Go logo"
              w={'auto'}
              h={4}
              src="./images/logo.svg"
            />
          </Link>
          <Spacer />

          {/* Search bar */}
          <InputGroup maxW={{ base: '15rem', md: '25rem', lg: '35rem' }}>
            <Input
              variant="outline"
              placeholder="Find events, people, places..."
              borderRadius="5px"
            />
            <InputLeftElement children={<FaSearch />} />
          </InputGroup>

          <Spacer />

          {/* Buttons group (add even + menu) */}
          <HStack spacing={3}>
            {/* Add event button: will go to Add Event page if signed in, to sign in page if not */}
            <Button
              color="white"
              bg="frenchPink.300"
              leftIcon={<FaPlus />}
              _hover={{ bg: 'frenchPink.400' }}
              display={{ base: 'none', md: 'flex' }}
            >
              <Link
                to={user !== null ? `/add` : `/login`}
                _hover={{ textDecoration: 'none' }}
              >
                Add event
              </Link>
            </Button>

            {/* Menu button: only display if user is signed in */}
            {user !== null ? (
              <Menu isLazy>
                <MenuButton as={Button} size="sm" px={0} py={0} rounded="full">
                  <Avatar
                    size="sm"
                    src={
                      'https://avatars2.githubusercontent.com/u/37842853?v=4'
                    }
                  />
                </MenuButton>
                <MenuList zIndex={5} bg="brand.600">
                  <Link to={`/hkhoa`} _hover={{ textDecoration: 'none' }}>
                    <MenuItem>
                      <VStack justify="start" alignItems="left">
                        <Text fontWeight="500">{name}</Text>
                        <Text size="sm" color="gray.500" mt="0 !important">
                          @{username}
                        </Text>
                      </VStack>
                    </MenuItem>
                  </Link>
                  <MenuDivider />
                  <Link
                    to={`/add`}
                    _hover={{ textDecoration: 'none' }}
                    display={{ base: 'flex', md: 'none' }}
                  >
                    <MenuItem display={{ base: 'flex', md: 'none' }}>
                      <Text fontWeight="500">Add event</Text>
                    </MenuItem>
                  </Link>
                  <MenuDivider />
                  <Link to={`/`} _hover={{ textDecoration: 'none' }}>
                    <MenuItem>
                      <Text fontWeight="500">Home</Text>
                    </MenuItem>
                  </Link>
                  <Link
                    to={`/shopping-cart`}
                    _hover={{ textDecoration: 'none' }}
                  >
                    <MenuItem>
                      <Text fontWeight="500">Shopping Cart</Text>
                    </MenuItem>
                  </Link>
                  <Link to={`/settings`} _hover={{ textDecoration: 'none' }}>
                    <MenuItem>
                      <Text fontWeight="500">Settings</Text>
                    </MenuItem>
                  </Link>
                  <MenuDivider />
                  {/* <Link to={'/login'}>
                    <MenuItem>
                      <Text fontWeight="500">Login</Text>
                    </MenuItem>
                  </Link> */}

                  <MenuItem
                    as="button"
                    onClick={async () => {
                      await signOut();
                    }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <div>
                <Link to={`/login`} _hover={{ textDecoration: 'none' }}>
                  <Button
                    rightIcon={<FaSignInAlt />}
                    colorScheme="whatsapp"
                    // variant="outline"
                    display={{ base: 'none', md: 'flex' }}
                  >
                    Login
                  </Button>
                </Link>

                <IconButton
                  colorScheme="whatsapp"
                  icon={<FaSignInAlt />}
                  // variant="outline"
                  display={{ base: 'flex', md: 'none' }}
                >
                  <Link to={`/login`} _hover={{ textDecoration: 'none' }} />
                </IconButton>
              </div>
            )}
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};

export default Navbar;
