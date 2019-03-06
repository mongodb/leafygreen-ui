import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, select } from '@storybook/addon-knobs';
import { emotion } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';
import RadioBoxGroup from './RadioBoxGroup';
import RadioBox from './RadioBox';

storiesOf('RadioBoxGroup', module).add('Default', () => (
  <section className="storybook-container">
    <RadioBoxGroup
      style={{ flexDirection: 'column' }}
      size={select(
        'Size',
        ['tightContentBox', 'full', 'small', 'medium'],
        'medium',
      )}
    >
      <RadioBox value="option-1">Radio Box 1</RadioBox>

      <RadioBox value="option-2">Radio Box 2</RadioBox>

      <RadioBox value="option-3" disabled>
        Radio Box 3
      </RadioBox>
    </RadioBoxGroup>
  </section>
));
