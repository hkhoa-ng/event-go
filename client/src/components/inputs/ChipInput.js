import React from 'react';
import {
  Stack,
  Button,
  Text,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
} from '@chakra-ui/react';

const Chip = ({ label, onDelete }) => {
  return (
    <Badge
      as="span"
      display="inline-flex"
      colorScheme="telegram"
      alignItems="center"
      pl="3"
      py="1px"
    >
      <Text color="white">{label}</Text>
      <Button
        variant="ghost"
        size="xs"
        ml="2"
        onClick={onDelete}
        aria-label="delete chip"
      >
        ×
      </Button>
    </Badge>
  );
};

const ChipInput = ({ availableTags, selectedTags, setSelectedTags }) => {
  const handleTagSelection = tag => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleTagRemoval = tagToRemove => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  return (
    <Stack spacing="2">
      <Stack direction="row">
        <Menu>
          <MenuButton
            px={4}
            py={2}
            transition="all 0.2s"
            borderRadius="md"
            borderWidth="1px"
            _hover={{ bg: 'gray.400' }}
            _expanded={{ bg: 'blue.400' }}
          >
            Select tags
          </MenuButton>
          <MenuList>
            {availableTags.map(tag => {
              if (!selectedTags.includes(tag))
                return (
                  <option>
                    <MenuItem
                      key={tag}
                      variant="ghost"
                      size="sm"
                      onClick={() => handleTagSelection(tag)}
                      p={3}
                    >
                      {tag.replace(/^\w/, c => c.toUpperCase())}
                    </MenuItem>
                  </option>
                );
            })}
          </MenuList>
        </Menu>
      </Stack>

      <Flex direction="row" wrap="wrap" alignItems={'center'} gap="10px">
        {selectedTags.map(tag => (
          <Chip key={tag} label={tag} onDelete={() => handleTagRemoval(tag)} />
        ))}
      </Flex>
    </Stack>
  );
};

export default ChipInput;
