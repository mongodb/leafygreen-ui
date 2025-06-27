import { Theme } from '@leafygreen-ui/lib';

import { ADDON_ID } from '../constants';

export const THEME_TOOL_ID = `${ADDON_ID}/theme`;
export const THEME_PARAM_KEY = 'theme';

export const THEME_VALUES = {
  [Theme.Light]: {
    name: 'Light',
    theme: Theme.Light,
    darkMode: false,
  },
  [Theme.Dark]: {
    name: 'Dark',
    theme: Theme.Dark,
    darkMode: true,
  },
};
