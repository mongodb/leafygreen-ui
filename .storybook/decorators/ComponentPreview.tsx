import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { palette } from '@leafygreen-ui/palette';
import { DecoratorFn } from '@storybook/react';

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

const decorator: DecoratorFn = (Story, options) => {
  const { darkMode, baseFontSize } = options.args;
  return (
    <LeafyGreenProvider darkMode={darkMode} baseFontSize={baseFontSize}>
      <div className={cx(rootStyle, { [darkModeStyle]: darkMode })}>
        <div>
          <Story darkMode={darkMode} {...options} />
        </div>
      </div>
    </LeafyGreenProvider>
  );
};

export default decorator;
