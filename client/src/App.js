import React, { useContext, useEffect, Suspense, useState } from 'react';
import { Center, ChakraProvider } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import { nanoid } from 'nanoid';

import myTheme from './styles/theme';
import EventContext from './context/EventContext';
import UserContext from './context/UserContext';
import {
  accessKeyId,
  secretKey,
  region,
  userPoolId,
  userWebClientId,
} from './utility/envConfig';

const LazyLoadedHome = React.lazy(() => import('./pages/Home'));
const LazyLoadedCart = React.lazy(() => import('./pages/Cart'));
const LazyLoadedSettings = React.lazy(() => import('./pages/Settings'));
const LazyLoadedEventDetail = React.lazy(() => import('./pages/EventDetail'));
const LazyLoadedProfile = React.lazy(() => import('./pages/Profile'));
const LazyLoadedLogin = React.lazy(() => import('./pages/Login'));
const LazyLoadedSignUp = React.lazy(() => import('./pages/SignUp'));
const LazyLoadedRecoverPassword = React.lazy(() =>
  import('./pages/RecoverPassword')
);
const LazyLoadedAddEvent = React.lazy(() => import('./pages/AddEvent'));

function App() {
  const username = 'hkhoa';
  const name = 'Khoa Nguyen';

  const [loading, setLoading] = useState(false);
  const { getAllEvents, allEvents, getAvailableTags } =
    useContext(EventContext);

  const { checkIfLoggedIn, storeUserToLocalStorage } = useContext(UserContext);
  // this use to check if user is logged in, can be used in different pages to persist user session
  useEffect(() => {
    async function handleCheckLogIn() {
      await checkIfLoggedIn(setLoading);
    }
    handleCheckLogIn();
  }, []);

  // this use to persist user session even with refresh button pressed by using the local storage
  useEffect(() => {
    async function handleStoreUserToLocalStorage() {
      await storeUserToLocalStorage(setLoading);
    }
    handleStoreUserToLocalStorage();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getAllEvents();
      await getAvailableTags();
    };
    fetchData();
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
        {allEvents.length > 0 ? (
          <Routes>
            <Route path="/" element={<LazyLoadedHome name={name} />} />
            <Route path="/shopping-cart" element={<LazyLoadedCart />} />
            <Route path="/settings" element={<LazyLoadedSettings />} />
            {allEvents.map(e => (
              <Route
                key={nanoid()}
                path={`/${e.event_id}`}
                element={<LazyLoadedEventDetail event={e} />}
              />
            ))}
            <Route path={`/${username}`} element={<LazyLoadedProfile />} />
            <Route path={`/login`} element={<LazyLoadedLogin />} />
            <Route path={`/signup`} element={<LazyLoadedSignUp />} />
            <Route path={`/recover`} element={<LazyLoadedRecoverPassword />} />
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
