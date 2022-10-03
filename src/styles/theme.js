import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const styles = {
  global: props => ({
    body: {
      bg: mode('#', '#')(props),
    },
  }),
};

const components = {
  Heading: {
    variants: {
      'product-name': {
        // Styling here
      },
    },
  },
  Link: {},
};

const fonts = {};

const colors = {
  coolBlack: {
    50: '#efeffd',
    100: '#d1d2e4',
    200: '#b2b4cd',
    300: '#9396b8',
    400: '#7578a3',
    500: '#5b5e89',
    600: '#46496b',
    700: '#32344d',
    800: '#1d1f30',
    900: '#090916',
  },
  creamWhite: '#f4f4f8',
  mandarin: {
    50: '#fff6dc',
    100: '#ffe3af',
    200: '#fed180',
    300: '#fdbe4f',
    400: '#fcac1f',
    500: '#e39308',
    600: '#b07202',
    700: '#7e5100',
    800: '#4d3100',
    900: '#1d0f00',
  },
};

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

const myTheme = extendTheme({
  config,
  styles,
  components,
  fonts,
  colors,
});

export default myTheme;
