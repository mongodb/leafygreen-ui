import React from 'react';
import { Decorator } from '@storybook/react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

export const withDarkMode =
  // eslint-disable-next-line react/display-name
  (): Decorator => (StoryFn: any, context: any) => {
    const globalTheme = context.globals?.theme;
    const darkMode = globalTheme?.darkMode;

    console.log('`withDarkMode` decorator', {
      globalTheme,
      darkMode,
    });

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <StoryFn {...context} />
      </LeafyGreenProvider>
    );
  };
