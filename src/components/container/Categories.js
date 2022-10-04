import React from 'react';
import {
  Box,
  Text,
  Heading,
  Button,
  Flex,
  PopoverTrigger,
  Portal,
  Popover,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  Wrap,
  Divider,
  IconButton,
} from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';
import { FiMoreHorizontal } from 'react-icons/fi';

function Categories() {
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
      zIndex={1}
      p={3}
      pt={{ base: '3', md: '10' }}
      top={{ base: '14', md: '10' }}
    >
      <Button
        colorScheme="brand"
        variant="ghost"
        leftIcon={<FaHome />}
        justifyContent="flex-start"
      >
        All events
      </Button>
      <Button
        colorScheme="brand"
        variant="ghost"
        leftIcon={<FaHome />}
        justifyContent="flex-start"
      >
        Popular events
      </Button>
      <Button
        display={{ base: 'none', md: 'flex' }}
        colorScheme="brand"
        variant="ghost"
        leftIcon={<FaHome />}
        justifyContent="flex-start"
      >
        Near me
      </Button>
      <Button
        display={{ base: 'none', md: 'flex' }}
        colorScheme="brand"
        variant="ghost"
        leftIcon={<FaHome />}
        justifyContent="flex-start"
      >
        Popular with friends
      </Button>
      <Button
        display={{ base: 'none', md: 'flex' }}
        colorScheme="brand"
        variant="ghost"
        leftIcon={<FaHome />}
        justifyContent="flex-start"
      >
        Night time
      </Button>
      <Button
        display={{ base: 'none', md: 'flex' }}
        colorScheme="brand"
        variant="ghost"
        leftIcon={<FaHome />}
        justifyContent="flex-start"
      >
        Sports
      </Button>
      <Button
        display={{ base: 'none', md: 'flex' }}
        colorScheme="brand"
        variant="ghost"
        leftIcon={<FaHome />}
        justifyContent="flex-start"
      >
        Musical
      </Button>
      <Button
        display={{ base: 'none', md: 'flex' }}
        colorScheme="brand"
        variant="ghost"
        leftIcon={<FaHome />}
        justifyContent="flex-start"
      >
        Academic
      </Button>
      <Button
        display={{ base: 'none', md: 'flex' }}
        colorScheme="brand"
        variant="ghost"
        leftIcon={<FaHome />}
        justifyContent="flex-start"
      >
        Courses
      </Button>
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
                <Button colorScheme="brand" leftIcon={<FaHome />}>
                  Near me
                </Button>
                <Button colorScheme="brand" leftIcon={<FaHome />}>
                  Popular with friends
                </Button>
                <Button colorScheme="brand" leftIcon={<FaHome />}>
                  Night time
                </Button>
                <Button colorScheme="brand" leftIcon={<FaHome />}>
                  Sports
                </Button>
                <Button colorScheme="brand" leftIcon={<FaHome />}>
                  Musical
                </Button>
                <Button colorScheme="brand" leftIcon={<FaHome />}>
                  Academic
                </Button>
                <Button colorScheme="brand" leftIcon={<FaHome />}>
                  Courses
                </Button>
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
