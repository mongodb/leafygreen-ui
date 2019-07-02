import { create } from '@storybook/theming';
import { uiColors } from '../packages/palette';

export default create({
  name: 'leafygreen',

  base: 'light',

  brandTitle: 'LeafyGreen UI',
  brandUrl: 'https://github.com/mongodb/leafygreen-ui',
  brandImage: 'logo.svg',

  colorPrimary: uiColors.green.base,
  colorSecondary: uiColors.green.base,

  // UI
  appBg: uiColors.gray.light3,
  appContentBg: uiColors.white,
  appBorderColor: uiColors.gray.light2,
  appBorderRadius: 4,

  // Typography
  fontBase: '"Akzidenz", Helvetica, Arial, sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: uiColors.gray.dark3,
  textInverseColor: 'rgba(255, 255, 255, 0.9)',

  // Toolbar default and active colors
  barTextColor: 'silver',
  barSelectedColor: uiColors.green.base,
  barBg: uiColors.white,

  // Form colors
  inputBg: uiColors.gray.light3,
  inputBorder: uiColors.gray.light2,
  inputTextColor: uiColors.gray.dark3,
  inputBorderRadius: 4,
});
