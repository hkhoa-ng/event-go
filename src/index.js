import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import myTheme from './styles/theme';
import { BrowserRouter } from 'react-router-dom';
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <BrowserRouter>
      <ColorModeScript initialColorMode={myTheme.config.initialColorMode} />
      <App />
    </BrowserRouter>
  </StrictMode>
);
