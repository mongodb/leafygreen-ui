import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

const lightModeShadow = palette.black;
const darkModeShadow = '#000000';

export const shadow = {
  [Theme.Light]: {
    100: `0 2 4 1px ${lightModeShadow}`,
  },
  [Theme.Dark]: {
    100: `0 4 20 -4px ${darkModeShadow}`,
  },
};
