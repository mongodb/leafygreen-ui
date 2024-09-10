import { create } from '@storybook/theming';

import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { color, fontFamilies, spacing } from '@leafygreen-ui/tokens';

const createStorybookTheme = (theme: Theme) => {
  return create({
    base: theme,
    brandTitle: 'LeafyGreen UI',
    brandUrl: 'https://github.com/mongodb/leafygreen-ui',
    brandImage: theme === Theme.Light ? 'logo.svg' : 'logo-dark.svg',

    // Typography
    fontBase: fontFamilies.default,
    fontCode: fontFamilies.code,

    colorPrimary:
      theme === Theme.Light ? palette.green.base : palette.green.dark1,
    colorSecondary: palette.green.dark1,

    // UI
    appBg: color[theme].background.secondary.default,
    appBorderColor: color[theme].border.secondary.default,
    appContentBg: color[theme].background.primary.default,
    appBorderRadius: spacing[200],

    // Text colors
    textColor: color[theme].text.primary.default,
    textInverseColor: color[theme].text.secondary.default,
    textMutedColor: color[theme].text.disabled.default,

    // Toolbar default and active colors
    barTextColor: color[theme].text.secondary.default,
    barHoverColor: color[theme].text.secondary.focus, // hover & focus text color
    barSelectedColor: palette.green.dark1, // background color
    barBg: color[theme].background.secondary.default,

    // Control knob colors
    buttonBg: color[theme].background.secondary.default,
    buttonBorder: color[theme].border.secondary.default,

    booleanBg: color[theme].background.secondary.default,
    booleanSelectedBg: color[theme].background.secondary.focus,

    inputBg: color[theme].background.secondary.default,
    inputBorder: color[theme].border.secondary.default,
    inputTextColor: color[theme].text.primary.default,
    inputBorderRadius: spacing[100],
  });
};

export const lightTheme = createStorybookTheme(Theme.Light);
export const darkTheme = createStorybookTheme(Theme.Dark);
