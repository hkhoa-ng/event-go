import React from 'react';
import { ChakraProvider, Box, VStack, Grid } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import myTheme from './styles/theme';

import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <ChakraProvider theme={myTheme}>
      <Navbar username="_hkhoa" name="Khoa Nguyen" />
    </ChakraProvider>
  );
}

export default App;
