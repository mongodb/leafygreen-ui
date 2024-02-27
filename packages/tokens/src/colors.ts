import { palette } from '@leafygreen-ui/palette';

import { Mode } from './mode';

const { black, blue, gray, green, red, white, yellow } = palette;

const color = {
  [Mode.Dark]: {
    bg: {
      primary: {
        default: black,
        hover: gray.dark2,
        focus: blue.dark3,
      },
      secondary: {
        default: gray.dark4,
        hover: gray.dark2,
        focus: blue.dark3,
      },
      inverse: {
        default: gray.light2,
        hover: gray.light3,
        focus: blue.light2,
      },
      info: {
        default: blue.dark3,
        hover: blue.dark3,
        focus: blue.dark3,
      },
      warning: {
        default: yellow.dark3,
        hover: yellow.dark3,
        focus: yellow.dark3,
      },
      success: {
        default: green.dark3,
        hover: green.dark3,
        focus: green.dark3,
      },
      error: {
        default: red.dark3,
        hover: red.dark3,
        focus: red.dark3,
      },
      disabled: {
        default: gray.dark2,
        hover: gray.dark2,
        focus: gray.dark2,
      },
    },
    border: {
      primary: {
        default: gray.base,
        hover: gray.base,
        focus: blue.light1,
      },
      secondary: {
        default: gray.dark2,
        hover: gray.dark2,
        focus: blue.light1,
      },
      success: {
        default: green.dark1,
        hover: green.dark1,
        focus: blue.light1,
      },
      error: {
        default: red.light1,
        hover: red.light1,
        focus: blue.light1,
      },
      disabled: {
        default: gray.dark2,
        hover: gray.dark2,
        focus: gray.dark2,
      },
    },
    icon: {
      primary: {
        default: gray.light1,
        hover: gray.light3,
        focus: blue.light3,
      },
      secondary: {
        default: gray.base,
        hover: gray.light3,
        focus: blue.light3,
      },
      inverse: {
        default: white,
        hover: black,
        focus: blue.dark2,
      },
      info: {
        default: blue.light1,
        hover: blue.light1,
        focus: blue.light1,
      },
      warning: {
        default: yellow.base,
        hover: yellow.base,
        focus: yellow.base,
      },
      success: {
        default: green.base,
        hover: green.base,
        focus: green.base,
      },
      error: {
        default: red.light1,
        hover: red.light1,
        focus: red.light1,
      },
      disabled: {
        default: gray.dark1,
        hover: gray.dark1,
        focus: gray.dark1,
      },
    },
    text: {
      primary: {
        default: gray.light2,
        hover: gray.light2,
        focus: blue.light3,
      },
      secondary: {
        default: gray.light1,
        hover: gray.light2,
        focus: blue.light3,
      },
      inversePrimary: {
        default: black,
        hover: black,
        focus: blue.dark2,
      },
      inverseSecondary: {
        default: gray.dark2,
        hover: black,
        focus: blue.dark2,
      },
      error: {
        default: red.light1,
        hover: red.light1,
        focus: red.light1,
      },
      disabled: {
        default: gray.dark1,
        hover: gray.dark1,
        focus: gray.dark1,
      },
    },
  },
  [Mode.Light]: {
    bg: {
      primary: {
        default: white,
        focus: blue.light3,
        hover: gray.light2,
      },
      secondary: {
        default: gray.light3,
        focus: blue.light3,
        hover: gray.light2,
      },
      inverse: {
        default: black,
        focus: blue.dark2,
        hover: gray.dark3,
      },
      info: {
        default: blue.light3,
        focus: blue.light3,
        hover: blue.light3,
      },
      warning: {
        default: yellow.light3,
        focus: yellow.light3,
        hover: yellow.light3,
      },
      success: {
        default: green.light3,
        focus: green.light3,
        hover: green.light3,
      },
      error: {
        default: red.light3,
        focus: red.light3,
        hover: red.light3,
      },
      disabled: {
        default: gray.light2,
        focus: gray.light2,
        hover: gray.light2,
      },
    },
    border: {
      primary: {
        default: gray.base,
        hover: gray.base,
        focus: blue.light1,
      },
      secondary: {
        default: gray.light2,
        hover: gray.light2,
        focus: blue.light1,
      },
      success: {
        default: green.dark1,
        hover: green.dark1,
        focus: blue.light1,
      },
      error: {
        default: red.base,
        hover: red.base,
        focus: blue.light1,
      },
      disabled: {
        default: gray.light1,
        hover: gray.light1,
        focus: gray.light1,
      },
    },
    icon: {
      primary: {
        default: gray.dark1,
        hover: black,
        focus: blue.dark1,
      },
      secondary: {
        default: gray.base,
        hover: black,
        focus: blue.dark1,
      },
      inverse: {
        default: white,
        hover: white,
        focus: blue.light2,
      },
      info: {
        default: blue.base,
        hover: blue.base,
        focus: blue.base,
      },
      warning: {
        default: yellow.dark2,
        hover: yellow.dark2,
        focus: yellow.dark2,
      },
      success: {
        default: green.dark1,
        hover: green.dark1,
        focus: green.dark1,
      },
      error: {
        default: red.base,
        hover: red.base,
        focus: red.base,
      },
      disabled: {
        default: gray.base,
        hover: gray.base,
        focus: gray.base,
      },
    },
    text: {
      primary: {
        default: black,
        hover: black,
        focus: blue.dark1,
      },
      secondary: {
        default: gray.dark1,
        hover: black,
        focus: blue.dark1,
      },
      inversePrimary: {
        default: white,
        hover: white,
        focus: blue.light2,
      },
      inverseSecondary: {
        default: gray.light1,
        hover: white,
        white: blue.light2,
      },
      error: {
        default: red.base,
        hover: red.base,
        focus: red.base,
      },
      disabled: {
        default: gray.base,
        hover: gray.base,
        focus: gray.base,
      },
    },
  },
} as const;

export default color;
