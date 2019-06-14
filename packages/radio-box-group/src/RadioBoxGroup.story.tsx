import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, select } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';

import RadioBoxGroup from './RadioBoxGroup';
import RadioBox from './RadioBox';
import Size from './Size';

storiesOf('RadioBoxGroup', module).add('Default', () => (
  <div
    className={css`
      width: 100%;
      padding: 2rem;
    `}
  >
    <RadioBoxGroup
      size={select('Size', Object.values(Size) as Array<Size>, Size.Default)}
    >
      <RadioBox value="option-1">{text('Label text', 'Radio Box 1')}</RadioBox>
      <RadioBox value="option-2">Radio Box 2</RadioBox>
      <RadioBox value="option-3" disabled={boolean('Disabled', true)}>
        Radio Box 3
      </RadioBox>
    </RadioBoxGroup>
  </div>
));
