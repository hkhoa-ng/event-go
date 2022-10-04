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
  brand: {
    50: '#f2eaff',
    100: '#d4c1f2',
    200: '#b69ae6',
    300: '#9971da',
    400: '#7c49cf',
    500: '#622fb5',
    600: '#4c258e',
    700: '#361a66',
    800: '#210f3f',
    900: '#0d031a',
  },
  frenchPink: {
    50: '#ffe2ee',
    100: '#ffb1ca',
    200: '#ff7fa6',
    300: '#ff4d82',
    400: '#fe1d5f',
    500: '#e50645',
    600: '#b30036',
    700: '#810026',
    800: '#4f0016',
    900: '#200008',
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
