import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

// non-palette values used for a11y
export const darkColors = [
  palette.blue.base,
  palette.green.dark1,
  '#D68000',
  palette.red.base,
  palette.purple.base,
  palette.blue.light1,
  palette.green.base,
  palette.yellow.base,
  palette.red.light1,
  palette.purple.light2,
  palette.blue.light2,
  palette.green.light1,
  palette.yellow.light2,
  palette.red.light2,
  palette.purple.light3,
] as const;
export type DarkColor = (typeof darkColors)[number];

// non-palette values used for a11y
export const lightColors = [
  palette.blue.base,
  palette.green.dark1,
  '#D68000',
  palette.red.base,
  palette.purple.dark2,
  palette.blue.dark1,
  palette.green.dark2,
  palette.yellow.dark2,
  palette.red.dark2,
  palette.purple.dark3,
  palette.blue.light1,
  '#00A982',
  '#B08B2E',
  '#F86259',
  palette.purple.base,
] as const;
export type LightColor = (typeof lightColors)[number];

export const colors = {
  [Theme.Dark]: darkColors,
  [Theme.Light]: lightColors,
} as const;
