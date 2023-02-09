import React, { useContext, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';

import myTheme from './styles/theme';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import EventDetail from './pages/EventDetail';
import Login from './pages/Login';
import AddEvent from './pages/AddEvent';

import EventContext from './context/EventContext';
import {
    accessKeyId,
  secretKey,
  region,
  userPoolId,
  userWebClientId
} from './utility/envConfig'
function App() {
  const username = 'hkhoa';
  const name = 'Khoa Nguyen';
  const event = {
    name: 'Random event with a very long long long name',
    url: 'a-random-event',
    description: 'Some very random description',
    img: 'https://images.unsplash.com/photo-1549451371-64aa98a6f660?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
  };

  const { getAllEvents } = useContext(EventContext);

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <ChakraProvider theme={myTheme}>
      <Routes>
        <Route path="/" element={<Home name={name} />} />
        <Route path="/shopping-cart" element={<Cart />} />
        <Route path="/settings" element={<Settings />} />
        <Route path={`/${event.url}`} element={<EventDetail {...event} />} />
        <Route path={`/${username}`} element={<Profile />} />
        <Route path={`/login`} element={<Login />} />
        <Route path={`/add`} element={<AddEvent />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
