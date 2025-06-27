import React from 'react';
import { useGlobals } from '@storybook/preview-api';
import type { Decorator } from '@storybook/react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { THEME_PARAM_KEY } from './constants';

/**
 * Decorator that applies the selected theme to the story
 * This ensures the theme gets applied to all stories when toggled
 */
export const withGlobalTheme: Decorator = StoryFn => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [globals] = useGlobals();
  const themeParam = globals[THEME_PARAM_KEY];

  console.log('withGlobalTheme', themeParam);

  return (
    <LeafyGreenProvider darkMode={themeParam?.darkMode || false}>
      <StoryFn />;
    </LeafyGreenProvider>
  );
};
