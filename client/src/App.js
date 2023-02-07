import React, { useContext, useEffect, Suspense } from 'react';
import { Center, ChakraProvider } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import { nanoid } from 'nanoid';

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

  const { getAllEvents, allEvents, getAvailableTags } =
    useContext(EventContext);

  useEffect(() => {
    getAllEvents();
    getAvailableTags();
  }, []);

  return (
    <ChakraProvider theme={myTheme}>
      <Suspense
        fallback={
          <Center h="100vh">
            <HashLoader
              size={150}
              color="#28a99e"
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </Center>
        }
      >
        {allEvents ? (
          <Routes>
            <Route path="/" element={<LazyLoadedHome name={name} />} />
            <Route path="/shopping-cart" element={<LazyLoadedCart />} />
            <Route path="/settings" element={<LazyLoadedSettings />} />
            {allEvents.map(e => (
              <Route
                key={nanoid()}
                path={`/${e.event_id}`}
                element={<LazyLoadedEventDetail {...e} />}
              />
            ))}
            <Route path={`/${username}`} element={<LazyLoadedProfile />} />
            <Route path={`/login`} element={<LazyLoadedLogin />} />
            <Route path={`/add`} element={<LazyLoadedAddEvent />} />
          </Routes>
        ) : (
          <Center h="100vh">
            <HashLoader
              size={150}
              color="#28a99e"
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </Center>
        )}
      </Suspense>
    </ChakraProvider>
  );
}

export default App;
