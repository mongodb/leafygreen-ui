import { transparentize } from 'polished';

import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

const lightModeShadow = transparentize(0.75, palette.black);
const darkModeShadow = transparentize(0.85, palette.white);

interface Value {
  readonly 100: string;
}

export const shadow: Record<Theme, Value> = {
  [Theme.Light]: {
    100: `0px 2px 4px 1px ${lightModeShadow}`,
  },
  [Theme.Dark]: {
    100: `0px 4px 20px -4px ${darkModeShadow}`,
  },
} as const;
