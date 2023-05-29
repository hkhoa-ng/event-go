import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ColorModeScript } from '@chakra-ui/react';
import { EventProvider } from './context/EventContext';
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import { UserProvider } from './context/UserContext';
import ReactGA from 'react-ga';
import App from './App';
import myTheme from './styles/theme';

const container = document.getElementById('root');

const initGoogleAnalytics = () => {
  // Replace 'YOUR_TRACKING_ID' with your Google Analytics tracking ID
  const trackingId = 'G-84SMNZL3FD';
  ReactGA.initialize(trackingId);
};

const Root = () => {
  useEffect(() => {
    initGoogleAnalytics();
  }, []);

  return (
    <BrowserRouter>
      <EventProvider>
        <ShoppingCartProvider>
          <UserProvider>
            <ColorModeScript
              initialColorMode={myTheme.config.initialColorMode}
            />
            <App />
          </UserProvider>
        </ShoppingCartProvider>
      </EventProvider>
    </BrowserRouter>
  );
};

ReactDOM.render(<Root />, container);
