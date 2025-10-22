import { transparentize } from 'polished';

import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

const lightModeShadowColor = transparentize(0.75, palette.black);

interface Value {
  readonly 100: string;
  readonly 1: string;
  readonly 2: string;
  readonly 3: string;
}

export const shadow: Record<Theme, Value> = {
  [Theme.Light]: {
    100: `0px 2px 4px 1px ${lightModeShadowColor}`,
    1: `0px 2px 4px 1px color-mix(in srgb, ${palette.black} 15%, transparent)`,
    2: `0px 18px 18px -15px color-mix(in srgb, ${palette.black} 20%, transparent)`,
    3: `0px 8px 20px -8px color-mix(in srgb, ${palette.black} 60%, transparent)`,
  },
  [Theme.Dark]: {
    100: `unset`, // no shadow in dark mode
    1: `0px 0px 0px 0px color-mix(in srgb, ${palette.white} 0%, transparent)`,
    2: `0 18px 18px -15px color-mix(in srgb, #000000 45%, transparent)`,
    3: `0 8px 20px -8px color-mix(in srgb, #000000 60%, transparent)`,
  },
} as const;
