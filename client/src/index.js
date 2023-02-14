import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import myTheme from './styles/theme';
import { BrowserRouter } from 'react-router-dom';
import { EventProvider } from './context/EventContext';
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import { UserProvider } from './context/UserContext';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
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
  </StrictMode>
);
