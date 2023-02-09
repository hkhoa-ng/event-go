import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import myTheme from './styles/theme';
import { BrowserRouter } from 'react-router-dom';
import { EventProvider } from './context/EventContext';
import { ShoppingCartProvider } from './context/ShoppingCartContext';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <BrowserRouter>
      <EventProvider>
        <ShoppingCartProvider>
          <ColorModeScript initialColorMode={myTheme.config.initialColorMode} />
          <App />
        </ShoppingCartProvider>
      </EventProvider>
    </BrowserRouter>
  </StrictMode>
);
