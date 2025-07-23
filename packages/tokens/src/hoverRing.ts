import { palette } from '@leafygreen-ui/palette';

import { Mode } from './mode';

/**
 * Add the `hoverRing` token to the `box-shadow` value of any element when hovered
 */
const hoverRing = {
  [Mode.Light]: {
    gray: `0 0 0 3px ${palette.gray.light2}`,
    green: `0 0 0 3px ${palette.green.light2}`,
    red: `0 0 0 3px ${palette.red.light2}`,
  },
  [Mode.Dark]: {
    gray: `0 0 0 3px ${palette.gray.dark2}`,
    green: `0 0 0 3px ${palette.green.dark3}`,
    red: `0 0 0 3px ${palette.yellow.dark3}`, // Yes, yellow
  },
} as const;

export default hoverRing;
