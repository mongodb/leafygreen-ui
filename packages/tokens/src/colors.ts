import { palette } from '@leafygreen-ui/palette';

const { black, blue, gray, green, red, white, yellow } = palette;

const colors = {
  accent: {
    dark: {
      primary: black,
      secondary: gray.dark4,
      inverse: gray.light2,
      info: blue.dark3,
      warning: yellow.dark3,
      success: green.dark3,
      error: red.dark3,
      disabled: gray.dark3,
    },
    light: {
      primary: gray.light3,
      secondary: gray.light3,
      inverse: black,
      info: blue.light3,
      warning: yellow.light3,
      success: green.light3,
      error: red.light3,
      disabled: gray.light2,
    },
  },

  bg: {
    dark: {
      primary: black,
      secondary: gray.dark4,
      inverse: gray.light2,
      disabled: gray.dark2,
      focus: blue.light3,
      hover: gray.dark2,
    },
    light: {
      primary: white,
      secondary: gray.light3,
      inverse: black,
      disabled: gray.light2,
      focus: blue.dark1,
      hover: gray.light2,
    },
  },

  border: {
    dark: {
      primary: gray.base,
      secondary: gray.dark2,
      success: green.dark1,
      error: red.light1,
      disabled: gray.dark2,
    },
    light: {
      primary: gray.base,
      secondary: gray.light2,
      success: green.dark1,
      error: red.base,
      disabled: gray.light1,
    },
  },

  icon: {
    dark: {
      primary: gray.light1,
      secondary: gray.base,
      inverse: white,
      info: blue.light1,
      warning: yellow.base,
      success: green.base,
      error: red.light1,
      disabled: gray.dark1,
    },
    light: {
      primary: gray.dark1,
      secondary: gray.base,
      inverse: white,
      info: blue.base,
      warning: yellow.dark2,
      success: green.dark1,
      error: red.base,
      disabled: gray.base,
    },
  },

  text: {
    dark: {
      primary: gray.light2,
      secondary: gray.light1,
      inverse: black,
      error: red.light1,
      disabled: gray.dark1,
      focus: blue.light3,
      hover: white,
    },
    light: {
      primary: black,
      secondary: gray.dark1,
      inverse: white,
      error: red.base,
      disabled: gray.base,
      focus: blue.dark1,
      hover: black,
    },
  },
} as const;

export default colors;
