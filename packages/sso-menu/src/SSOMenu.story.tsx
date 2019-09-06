import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import SSOMenu, { ActiveProductOptions } from '.';

storiesOf('SSOMenu', module).add('Default', () => (
  <SSOMenu
    user={{
      name: text('name', 'Alex Smith'),
      email: text('email', 'alex.smith@mongodb.com'),
    }}
    activeProduct={select(
      'activeProduct',
      Object.values(ActiveProductOptions) as Array<Size>,
      ActiveProductOptions.Atlas,
    )}
  />
));
