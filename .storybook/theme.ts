import { create } from '@storybook/theming';
import { fontFamilies } from '../packages/tokens';
import { palette } from '../packages/palette';

export default create({
  base: 'light',

  brandTitle: 'LeafyGreen UI',
  brandUrl: 'https://github.com/mongodb/leafygreen-ui',
  brandImage: 'logo.svg',

  colorPrimary: palette.green.base,
  colorSecondary: palette.green.dark1,

  // UI
  appBg: palette.gray.light3,
  appContentBg: palette.white,
  appBorderColor: palette.gray.light2,
  appBorderRadius: 8,

  // Typography
  fontBase: fontFamilies.default,
  fontCode: fontFamilies.code,

  // Text colors
  textColor: palette.gray.dark3,
  textInverseColor: palette.black,

  // Toolbar default and active colors
  barTextColor: palette.gray.base,
  barSelectedColor: palette.green.dark1,
  barBg: palette.white,

  // Form colors
  inputBg: palette.gray.light3,
  inputBorder: palette.gray.light2,
  inputTextColor: palette.gray.dark3,
  inputBorderRadius: 4,
});
