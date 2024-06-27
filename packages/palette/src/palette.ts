export const white = '#FFFFFF' as const;
export const black = '#001E2B' as const;
export const transparent = '#FFFFFF00' as const;

export const gray = {
  dark4: '#112733',
  dark3: '#1C2D38',
  dark2: '#3D4F58',
  dark1: '#5C6C75',
  base: '#889397',
  light1: '#C1C7C6',
  light2: '#E8EDEB',
  light3: '#F9FBFA',
} as const;

export const green = {
  dark3: '#023430',
  dark2: '#00684A',
  dark1: '#00A35C',
  base: '#00ED64',
  light1: '#71F6BA',
  light2: '#C0FAE6',
  light3: '#E3FCF7',
} as const;

export const purple = {
  dark3: '#2D0B59',
  dark2: '#5E0C9E',
  base: '#B45AF2',
  light2: '#F1D4FD',
  light3: '#F9EBFF',
} as const;

export const blue = {
  dark3: '#0C2657',
  dark2: '#083C90',
  dark1: '#1254B7',
  base: '#016BF8',
  light1: '#0498EC',
  light2: '#C3E7FE',
  light3: '#E1F7FF',
} as const;

export const yellow = {
  dark3: '#4C2100',
  dark2: '#944F01',
  base: '#FFC010',
  light2: '#FFEC9E',
  light3: '#FEF7DB',
} as const;

export const red = {
  dark3: '#5B0000',
  dark2: '#970606',
  base: '#DB3030',
  light1: '#FF6960',
  light2: '#FFCDC7',
  light3: '#FFEAE5',
} as const;

/**
 *
 * Palette exports the latest colors used in designs following the brand refresh.
 *
 * If you are still using `uiColors`, refer to the [upgrade guide](https://github.com/mongodb/leafygreen-ui/blob/main/packages/palette/UPGRADE.md) for additional information.
 *
 * @public
 */
const palette = {
  white,
  black,
  transparent,
  gray,
  green,
  purple,
  blue,
  yellow,
  red,
};

export default palette;
