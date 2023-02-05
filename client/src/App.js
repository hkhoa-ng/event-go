import React, { useContext, useEffect, Suspense } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';

import myTheme from './styles/theme';
import EventContext from './context/EventContext';

const LazyLoadedHome = React.lazy(() => import('./pages/Home'));
const LazyLoadedCart = React.lazy(() => import('./pages/Cart'));
const LazyLoadedSettings = React.lazy(() => import('./pages/Settings'));
const LazyLoadedEventDetail = React.lazy(() => import('./pages/EventDetail'));
const LazyLoadedProfile = React.lazy(() => import('./pages/Profile'));
const LazyLoadedLogin = React.lazy(() => import('./pages/Login'));
const LazyLoadedAddEvent = React.lazy(() => import('./pages/AddEvent'));

function App() {
  const username = 'hkhoa';
  const name = 'Khoa Nguyen';
  const event = {
    name: 'Random event with a very long long long name',
    url: 'a-random-event',
    description: 'Some very random description',
    img: 'https://images.unsplash.com/photo-1549451371-64aa98a6f660?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
  };

  const { getAllEvents, allEvents } = useContext(EventContext);

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <ChakraProvider theme={myTheme}>
      <Suspense fallback={<div>Loading...</div>}>
        {allEvents ? (
          <Routes>
            <Route path="/" element={<LazyLoadedHome name={name} />} />
            <Route path="/shopping-cart" element={<LazyLoadedCart />} />
            <Route path="/settings" element={<LazyLoadedSettings />} />
            {allEvents.map(e => (
              <Route
                path={`/${e.event_id}`}
                element={<LazyLoadedEventDetail {...e} />}
              />
            ))}
            <Route path={`/${username}`} element={<LazyLoadedProfile />} />
            <Route path={`/login`} element={<LazyLoadedLogin />} />
            <Route path={`/add`} element={<LazyLoadedAddEvent />} />
          </Routes>
        ) : (
          <div>Loading...</div>
        )}
      </Suspense>
    </ChakraProvider>
  );
}

export default App;
