import React from 'react';
import { Center } from '@chakra-ui/react';
import Navbar from '../components/navbar/Navbar';

function Settings() {
  return (
    <Center flexDir="column">
      <Navbar username={'hkhoa'} name="Khoa Nguyen" />
    </Center>
  );
}

export default Settings;
