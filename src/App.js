import React from 'react';
import { ChakraProvider, Box, VStack, Grid } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';

import { ColorModeSwitcher } from './ColorModeSwitcher';
import myTheme from './styles/theme';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

import Navbar from './components/navbar/Navbar';

function App() {
  const username = '_hkhoa';
  const name = 'Khoa Nguyen';
  return (
    <ChakraProvider theme={myTheme}>
      <Routes>
        <Route path="/" element={<Home name={name} />} />
        <Route path="/shopping-cart" element={<Cart />} />
        <Route path="/settings" element={<Settings />} />
        <Route path={`/${username}`} element={<Profile />} />
      </Routes>
      <Navbar username={username} name="Khoa Nguyen" />
    </ChakraProvider>
  );
}

export default App;
