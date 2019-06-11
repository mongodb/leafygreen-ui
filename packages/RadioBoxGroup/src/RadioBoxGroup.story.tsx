import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, select } from '@storybook/addon-knobs';
import { emotion } from '@leafygreen-ui/lib';

import RadioBoxGroup from './RadioBoxGroup';
import RadioBox from './RadioBox';

storiesOf('RadioBoxGroup', module).add('Default', () => (
  <div className={emotion.css`width: 100%; padding: 2rem;`}>
    <RadioBoxGroup
      size={select('Size', ['compact', 'default', 'full'] as const, 'default')}
    >
      <RadioBox value="option-1">{text('Label text', 'Radio Box 1')}</RadioBox>
      <RadioBox value="option-2">Radio Box 2</RadioBox>
      <RadioBox value="option-3" disabled={boolean('Disabled', true)}>
        Radio Box 3
      </RadioBox>
    </RadioBoxGroup>
  </div>
));
