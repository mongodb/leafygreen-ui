import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import Toggle, { Size } from '.';

storiesOf('Toggle', module).add('Default', () => {
  const darkMode = boolean('darkMode', false);

  return (
    <LeafyGreenProvider>
      <div
        className={css`
          background-color: ${darkMode ? uiColors.gray.dark2 : uiColors.white};
          padding: 20px;
        `}
      >
        <label
          htmlFor="toggle"
          id="label"
          className={css`
            display: block;
            margin-bottom: 16px;
            color: ${darkMode ? uiColors.white : uiColors.gray.dark2};
          `}
        >
          This is a label for my toggle.
        </label>

        <Toggle
          id="toggle"
          aria-labelledby="label"
          darkMode={darkMode}
          size={select(
            'Size',
            Object.values(Size) as Array<Size>,
            Size.Default,
          )}
          disabled={boolean('Disabled', false)}
        />
      </div>
    </LeafyGreenProvider>
  );
});
