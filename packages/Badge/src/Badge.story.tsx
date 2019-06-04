import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import Badge from './Badge';
import { Variant } from '.';

storiesOf('Badge', module).add('Default', () => (
  <Badge
    variant={select<Variant>(
      'Variant',
      [
        'default',
        'danger',
        'warning',
        'darkBlue',
        'lightBlue',
        'primary',
        'outline',
        'dark',
      ],
      'darkBlue',
    )}
  >
    {text('Badge Text', 'Badge')}
  </Badge>
));
