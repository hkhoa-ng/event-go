import React, { useContext, useEffect, Suspense, useState } from 'react';
import { Center, ChakraProvider } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import { nanoid } from 'nanoid';

import myTheme from './styles/theme';
import EventContext from './context/EventContext';
import UserContext from './context/UserContext';

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
const LazyLoadedEventsByTag = React.lazy(() => import('./pages/EventsByTags'));
const LazyLoadedDiscoverPeople = React.lazy(() =>
  import('./pages/DiscoverPeople')
);

function App() {
  const [loading, setLoading] = useState(true);
  const { getAllEvents, allEvents, getAvailableTags, availableTags } =
    useContext(EventContext);

  const { checkIfLoggedIn, allUsers, getAllUsers } = useContext(UserContext);
  // this use to check if user is logged in, can be used in different pages to persist user session
  useEffect(() => {
    async function handleCheckLogIn() {
      await checkIfLoggedIn();
    }
    handleCheckLogIn();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getAllEvents();
      await getAvailableTags();
      await getAllUsers();
      setLoading(false);
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
        {!loading ? (
          <Routes>
            <Route path="/" element={<LazyLoadedHome />} />
            <Route path="/shopping-cart" element={<LazyLoadedCart />} />
            <Route path="/settings" element={<LazyLoadedSettings />} />
            {allEvents.map(e => (
              <Route
                key={nanoid()}
                path={`/${e.event_id}`}
                element={<LazyLoadedEventDetail event={e} />}
              />
            ))}
            {allUsers.map(u => (
              <Route
                key={nanoid()}
                path={`/${u.user_name}`}
                element={<LazyLoadedProfile username={u.user_name} />}
              />
            ))}
            {availableTags.map(t => (
              <Route
                key={nanoid()}
                path={`/${t.replace(/\s+/g, '-')}-events`}
                element={<LazyLoadedEventsByTag tag={t} />}
              />
            ))}

            <Route path={`/login`} element={<LazyLoadedLogin />} />
            <Route path={`/signup`} element={<LazyLoadedSignUp />} />
            <Route path={`/recover`} element={<LazyLoadedRecoverPassword />} />
            <Route path={`/add`} element={<LazyLoadedAddEvent />} />
            <Route path={`/people`} element={<LazyLoadedDiscoverPeople />} />
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
