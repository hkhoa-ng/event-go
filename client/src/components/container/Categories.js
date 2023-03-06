import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Flex,
  PopoverTrigger,
  Portal,
  Popover,
  PopoverCloseButton,
  PopoverBody,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  Wrap,
  Divider,
  IconButton,
} from '@chakra-ui/react';
import UserContext from '../../context/UserContext';
import { FaHome } from 'react-icons/fa';
import { FiMoreHorizontal } from 'react-icons/fi';
import { nanoid } from 'nanoid';

function Categories(props) {
  const { checkIfLoggedIn, user } = useContext(UserContext);
  const navigate = useNavigate();
  // // this use to check if user is logged in, can be used in different pages to persist user session
  useEffect(() => {
    async function handleCheckLogIn() {
      await checkIfLoggedIn();
    }
    handleCheckLogIn();
  }, []);

  return (
    <Flex
      flexDir={{ base: 'row', md: 'column' }}
      w={{
        base: '100vw',
        md: '30vw',
        lg: '25vw',
        xl: '20vw',
        '2xl': '15vw',
      }}
      h={{ base: 'auto', md: '100vh' }}
      alignItems="space-between"
      justifyContent={{ base: 'center', md: 'flex-start' }}
      gap={5}
      bg="brand.700"
      position="fixed"
      zIndex={5}
      p={3}
      pt={{ base: '3', md: '10' }}
      top={{ base: '14', md: '10' }}
    >
      <Button
        colorScheme="brand"
        variant="ghost"
        // leftIcon={<FaHome />}
        justifyContent="flex-start"
        color="gray.300"
        onClick={() => {
          navigate(user ? '/people' : '/login');
        }}
      >
        Discover people
      </Button>

      {props.tags.map(tag => {
        return (
          <Button
            key={nanoid()}
            display={{ base: 'none', md: 'flex' }}
            colorScheme="brand"
            variant="ghost"
            // leftIcon={<FaHome />}
            color="gray.300"
            justifyContent="flex-start"
            onClick={() => {
              navigate(`/${tag.replace(/\s+/g, '-')}-events`);
            }}
          >
            {tag.replace(/^\w/, c => c.toUpperCase())}
          </Button>
        );
      })}

      <Popover>
        <PopoverTrigger>
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            icon={<FiMoreHorizontal />}
          />
        </PopoverTrigger>
        <Portal>
          <PopoverContent bg="brand.600">
            <PopoverArrow bg="brand.600" />
            <PopoverHeader>All event categories</PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              <Wrap pl="5px" py="10px">
                {props.tags.map(tag => {
                  return (
                    <Button
                      key={nanoid()}
                      colorScheme="gray"
                      variant="solid"
                      // leftIcon={<FaHome />}
                      color="gray.300"
                      onClick={() => {
                        navigate(`/${tag.replace(/\s+/g, '-')}-events`);
                      }}
                    >
                      {tag.replace(/^\w/, c => c.toUpperCase())}
                    </Button>
                  );
                })}
              </Wrap>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
      <Divider display={{ base: 'none', md: 'flex' }} />
    </Flex>
  );
}

export default Categories;
