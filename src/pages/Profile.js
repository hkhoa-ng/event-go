import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

import Navbar from '../components/navbar/Navbar';

function Profile() {
  return (
    <Box>
      <Navbar username={'hkhoa'} name="Khoa Nguyen" />
      <Box mt={20} px={10}>
        <Heading>Profile</Heading>
      </Box>
    </Box>
  );
}

export default Profile;
