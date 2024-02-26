import { palette } from '@leafygreen-ui/palette';

import { Mode } from './mode';

const { black, blue, gray, green, red, white, yellow } = palette;

const color = {
  [Mode.Dark]: {
    bg: {
      primary: black,
      secondary: gray.dark4,
      inverse: gray.light2,
      info: blue.dark3,
      warning: yellow.dark3,
      success: {
        default: green.dark3,
        hover: green.dark3,
        focus: green.dark3,
      },
      error: red.dark3,
      disabled: gray.dark2,
      // focus: blue.light3,
      // hover: gray.dark2,
    },
    border: {
      primary: gray.base,
      secondary: gray.dark2,
      success: green.dark1,
      error: red.light1,
      disabled: gray.dark2,
    },
    icon: {
      primary: gray.light1,
      secondary: gray.base,
      inverse: white,
      info: blue.light1,
      warning: yellow.base,
      success: green.base,
      error: red.light1,
      disabled: gray.dark1,
    },
    text: {
      primary: gray.light2,
      secondary: gray.light1,
      inverse: black,
      error: red.light1,
      disabled: gray.dark1,
      // focus: blue.light3,
      // hover: white,
    },
  },
  [Mode.Light]: {
    bg: {
      primary: white,
      secondary: gray.light3,
      inverse: black,
      info: blue.light3,
      warning: yellow.light3,
      success: green.light3,
      error: red.light3,
      disabled: gray.light2,
      // focus: blue.dark1,
      // hover: gray.light2,
    },
    border: {
      primary: gray.base,
      secondary: gray.light2,
      success: green.dark1,
      error: red.base,
      disabled: gray.light1,
    },
    icon: {
      primary: gray.dark1,
      secondary: gray.base,
      inverse: white,
      info: blue.base,
      warning: yellow.dark2,
      success: green.dark1,
      error: red.base,
      disabled: gray.base,
    },
    text: {
      primary: black,
      secondary: gray.dark1,
      inverse: white,
      error: red.base,
      disabled: gray.base,
      // focus: blue.dark1,
      // hover: black,
    },
  },
} as const;

export default color;
