import React from 'react';
import { ChakraProvider, Box, VStack, Grid } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';

import { ColorModeSwitcher } from './ColorModeSwitcher';
import myTheme from './styles/theme';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import EventDetail from './pages/EventDetail';
import Login from './pages/Login';

import Navbar from './components/navbar/Navbar';

function App() {
  const username = 'hkhoa';
  const name = 'Khoa Nguyen';
  const event = {
    name: 'Random event with a very long long long name',
    url: 'a-random-event',
    description: 'Some very random description',
    img: 'https://images.unsplash.com/photo-1549451371-64aa98a6f660?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
  };

  return (
    <ChakraProvider theme={myTheme}>
      <Routes>
        <Route path="/" element={<Home name={name} />} />
        <Route path="/shopping-cart" element={<Cart />} />
        <Route path="/settings" element={<Settings />} />
        <Route path={`/${event.url}`} element={<EventDetail {...event} />} />
        <Route path={`/${username}`} element={<Profile />} />
        <Route path={`/login`} element={<Login />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
