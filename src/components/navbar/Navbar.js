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
  useColorModeValue,
  Heading,
  InputGroup,
  InputRightElement,
  InputLeftElement,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ReactNode } from 'react';
import { FaSearch, FaPrint, FaPlus } from 'react-icons/fa';
import { AiOutlinePlus } from 'react-icons/ai';

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
      bg="brand.600"
      width="100%"
      zIndex="10"
    >
      <Container minW="90%" px={4} mx="auto">
        <HStack>
          <Link to={`/event-go/`} _hover={{ textDecoration: 'none' }}>
            <Image
              alt="Event-Go logo"
              w={'auto'}
              h={4}
              src="./images/logo.svg"
            />
          </Link>
          <Spacer />
          <InputGroup maxW={{ base: '15rem', md: '25rem', lg: '35rem' }}>
            <Input
              variant="outline"
              placeholder="Find events, people, places..."
              borderRadius="5px"
            />
            <InputLeftElement children={<FaSearch />} />
            {/* <Button
                aria-label="Search button"
                variant="solid"
                fontWeight="medium"
              >
                Search
              </Button> */}

            {/* </InputLeftElement> */}
          </InputGroup>
          <Spacer />
          <HStack spacing={3}>
            <Button
              color="white"
              bg="frenchPink.300"
              leftIcon={<FaPlus />}
              _hover={{ bg: 'frenchPink.400' }}
              display={{ base: 'none', md: 'flex' }}
            >
              Add event
            </Button>

            <Menu isLazy>
              <MenuButton as={Button} size="sm" px={0} py={0} rounded="full">
                <Avatar
                  size="sm"
                  src={'https://avatars2.githubusercontent.com/u/37842853?v=4'}
                />
              </MenuButton>
              <MenuList zIndex={5} bg="brand.600">
                <Link
                  to={`/${props.username}`}
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
                <Link to={`/event-go/`} _hover={{ textDecoration: 'none' }}>
                  <MenuItem>
                    <Text fontWeight="500">Home</Text>
                  </MenuItem>
                </Link>
                <Link
                  to={`/event-go/shopping-cart`}
                  _hover={{ textDecoration: 'none' }}
                >
                  <MenuItem>
                    <Text fontWeight="500">Shopping Cart</Text>
                  </MenuItem>
                </Link>
                <Link
                  to={`/event-go/settings`}
                  _hover={{ textDecoration: 'none' }}
                >
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
