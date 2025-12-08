import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { color, InteractionState, Variant } from '@leafygreen-ui/tokens';

/** non-palette blue used for Chat branding */
const ALT_BLUE_COLOR = '#00D2FF';

export const getDisabledFill = (theme: Theme) => {
  return color[theme].icon[Variant.Disabled][InteractionState.Default];
};

export const getGradientStartColor = (darkMode: boolean) => {
  return palette.green[darkMode ? 'base' : 'dark1'];
};

export const getGradientEndColor = (darkMode: boolean) => {
  return darkMode ? ALT_BLUE_COLOR : palette.blue.base;
};
