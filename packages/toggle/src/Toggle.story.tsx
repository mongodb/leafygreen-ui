import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import Toggle, { Size } from '.';

storiesOf('Toggle', module).add('Default', () => {
  const darkMode = boolean('darkMode', false);

  return (
    <div
      className={css`
        background-color: ${darkMode ? uiColors.gray.dark1 : uiColors.white};
        padding: 20px;
      `}
    >
      <div>Brooke</div>
      <Toggle
        darkMode={darkMode}
        size={select('Size', Object.values(Size) as Array<Size>, Size.Default)}
        disabled={boolean('Disabled', false)}
      />
    </div>
  );
});
