import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { palette } from '@leafygreen-ui/palette';
import {
  DecoratorFn,
  ReactFramework,
  StoryContext,
  StoryFn,
} from '@storybook/react';
import { GENERATED_STORY_NAME } from './GeneratedStory';

const rootStyle = css`
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 100px;
  height: 100%;
  overflow: auto;
`;

const darkModeStyle = css`
  background-color: ${palette.black};
`;

const decorator: DecoratorFn = (
  StoryFn: StoryFn,
  context: StoryContext<ReactFramework>,
) => {
  const { darkMode, baseFontSize } = context.args;
  return (
    <LeafyGreenProvider darkMode={darkMode} baseFontSize={baseFontSize}>
      <div
        className={cx({
          [rootStyle]: context.story !== GENERATED_STORY_NAME,
          [darkModeStyle]: darkMode,
        })}
      >
        <div>
          <StoryFn darkMode={darkMode} {...context} />
        </div>
      </div>
    </LeafyGreenProvider>
  );
};

export default decorator;
