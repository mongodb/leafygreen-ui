import React, { memo, useCallback, useEffect } from 'react';
import { IconButton } from '@storybook/components';
import { LightningIcon } from '@storybook/icons';
import { useGlobals, useStorybookApi } from '@storybook/manager-api';

import { Theme } from '@leafygreen-ui/lib';

import { ADDON_ID } from '../constants';

import { THEME_PARAM_KEY, THEME_TOOL_ID, THEME_VALUES } from './constants';

/**
 * ThemeToggle component that renders a button in the Storybook toolbar
 * to toggle between light and dark themes
 */
export const ThemeToggle = memo(function ThemeToggle() {
  const [globals, updateGlobals] = useGlobals();
  const api = useStorybookApi();

  // Get the current theme from globals or default to light
  const currentTheme = globals[THEME_PARAM_KEY]?.theme || Theme.Light;
  const isLightTheme = currentTheme === Theme.Light;

  // Toggle between light and dark themes
  const toggleTheme = useCallback(() => {
    const newTheme = isLightTheme ? Theme.Dark : Theme.Light;

    updateGlobals({
      [THEME_PARAM_KEY]: THEME_VALUES[newTheme],
    });
  }, [isLightTheme, updateGlobals]);

  // Register keyboard shortcut for theme toggle
  useEffect(() => {
    api.setAddonShortcut(ADDON_ID, {
      label: 'Toggle theme [T]',
      defaultShortcut: ['T'],
      actionName: 'theme-toggle',
      showInMenu: true,
      action: toggleTheme,
    });
  }, [toggleTheme, api]);

  console.log('ThemeToggle rendered', { currentTheme });

  return (
    <IconButton
      key={THEME_TOOL_ID}
      active={true}
      title={`Switch to ${isLightTheme ? 'dark' : 'light'} theme`}
      onClick={toggleTheme}
    >
      <LightningIcon />
    </IconButton>
  );
});
