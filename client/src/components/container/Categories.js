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
import { nanoid } from 'nanoid';

function Categories(props) {
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
        leftIcon={<FaHome />}
        justifyContent="flex-start"
      >
        Discover people
      </Button>
      <Button
        colorScheme="brand"
        variant="ghost"
        leftIcon={<FaHome />}
        justifyContent="flex-start"
      >
        All events
      </Button>

      {props.tags.map(tag => {
        return (
          <Button
            key={nanoid()}
            display={{ base: 'none', md: 'flex' }}
            colorScheme="brand"
            variant="ghost"
            leftIcon={<FaHome />}
            justifyContent="flex-start"
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
                      leftIcon={<FaHome />}
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
