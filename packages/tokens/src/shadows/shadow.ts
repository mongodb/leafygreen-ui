import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

interface Value {
  readonly 100: string;
  readonly 1: string;
  readonly 2: string;
  readonly 3: string;
  readonly overflow: string;
  readonly expandableCard: string;
}

export const shadows: Record<Theme, Value> = {
  [Theme.Light]: {
    100: `color-mix(in srgb, ${palette.black} 15%, transparent)`,
    1: `color-mix(in srgb, ${palette.black} 15%, transparent)`,
    2: `color-mix(in srgb, ${palette.black} 20%, transparent)`,
    3: `color-mix(in srgb, ${palette.black} 60%, transparent)`,
    overflow: `color-mix(in srgb, ${palette.gray.dark1} 30%, transparent)`,
    expandableCard: `color-mix(in srgb, ${palette.white} 10%, transparent)`,
  },
  [Theme.Dark]: {
    100: `unset`, // no shadow in dark mode
    1: `color-mix(in srgb, ${palette.white} 0%, transparent)`,
    2: `color-mix(in srgb, #000000 45%, transparent)`,
    3: `color-mix(in srgb, #000000 60%, transparent)`,
    overflow: `color-mix(in srgb, #000000 30%, transparent)`,
    expandableCard: `color-mix(in srgb, ${palette.black} 10%, transparent)`,
  },
} as const;

export const boxShadows: Record<Theme, Value> = {
  [Theme.Light]: {
    /* deprecated use 1, 2, 3 instead */
    100: `0px 2px 4px 1px ${shadows[Theme.Light][100]}`,
    1: `0px 2px 4px 1px ${shadows[Theme.Light][1]}`,
    2: `0px 18px 18px -15px ${shadows[Theme.Light][2]}`,
    3: `0px 8px 20px -8px ${shadows[Theme.Light][3]}`,
    overflow: `0px 2px 4px 1px ${shadows[Theme.Light]['overflow']}`,
    expandableCard: `0px 2px 4px 1px ${shadows[Theme.Light]['expandableCard']}`,
  },
  [Theme.Dark]: {
    /* deprecated use 1, 2, 3 instead */
    100: `unset`, // no shadow in dark mode
    1: `0px 0px 0px 0px color-mix(in srgb, ${palette.white} 0%, transparent)`,
    2: `0 18px 18px -15px color-mix(in srgb, #000000 45%, transparent)`,
    3: `0 8px 20px -8px color-mix(in srgb, #000000 60%, transparent)`,
    overflow: `0px 2px 4px 1px ${shadows[Theme.Dark]['overflow']}`,
    expandableCard: `0px 2px 4px 1px ${shadows[Theme.Dark]['expandableCard']}`,
  },
} as const;
