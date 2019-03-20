import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import Badge from './Badge';

storiesOf('Badge', module).add('Default', () => (
  <section className="storybook-container">
    <Badge
      variant={select(
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
  </section>
));
