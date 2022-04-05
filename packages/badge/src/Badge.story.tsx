import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import Badge from './Badge';
import { Variant } from '.';

storiesOf('Packages/Badge', module).add('Default', () => (
  <Badge variant={select('Variant', Object.values(Variant), Variant.LightGray)}>
    {text('Badge Text', 'Badge')}
  </Badge>
));
