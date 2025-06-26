import React from 'react';
import { Decorator, StoryContext, StoryFn } from '@storybook/react';

import { css, cx } from '@leafygreen-ui/emotion';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { palette } from '@leafygreen-ui/palette';

import { isGeneratedStory } from './PropCombinations';

const rootStyle = css`
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 100px;
  height: 100%;
`;

const darkModeStyle = css`
  background-color: ${palette.black};
`;

const decorator: Decorator = (StoryFn: StoryFn, context: StoryContext<any>) => {
  const { darkMode: darkModeArg, baseFontSize } = context.args;
  const globalTheme = context.globals?.theme;
  const darkMode = darkModeArg ?? globalTheme?.darkMode;

  return (
    <LeafyGreenProvider darkMode={darkMode} baseFontSize={baseFontSize}>
      <div
        className={cx(
          {
            [rootStyle]: !isGeneratedStory(context),
            [darkModeStyle]: darkMode,
          },
          'component-preview',
        )}
      >
        <StoryFn darkMode={darkMode} {...context} />

        <code>globals={JSON.stringify(context.globals)}</code>
      </div>
    </LeafyGreenProvider>
  );
};

export default decorator;
