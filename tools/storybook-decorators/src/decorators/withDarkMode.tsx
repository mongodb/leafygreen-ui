import React from 'react';
import { Decorator, StoryContext, StoryFn } from '@storybook/react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { getDarkModeFromContext } from './utils/getDarkModeFromContext';

export const withDarkMode =
  // eslint-disable-next-line react/display-name
  (): Decorator => (StoryFn: StoryFn, context: StoryContext<any>) => {
    const darkMode = getDarkModeFromContext(context);

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <StoryFn {...context} />
      </LeafyGreenProvider>
    );
  };
