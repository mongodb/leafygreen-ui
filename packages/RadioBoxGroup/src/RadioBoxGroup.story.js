import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, select } from '@storybook/addon-knobs';

import RadioBoxGroup from './RadioBoxGroup';
import RadioBox from './RadioBox';

storiesOf('RadioBoxGroup', module).add('Default', () => (
  <section className="storybook-container">
    <RadioBoxGroup
      size={select('Size', ['tightContentBox', 'default', 'full'], 'default')}
    >
      <RadioBox value="option-1">Radio Box 1</RadioBox>

      <RadioBox value="option-2">Radio Box 2</RadioBox>

      <RadioBox value="option-3" disabled={boolean('Disabled', true)}>
        Radio Box 3
      </RadioBox>
    </RadioBoxGroup>
  </section>
));
