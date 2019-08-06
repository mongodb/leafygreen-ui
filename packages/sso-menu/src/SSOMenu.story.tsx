import React from 'react';
import { storiesOf } from '@storybook/react';
import SSOMenu, { ActiveProduct } from '.';

storiesOf('SSOMenu', module).add('Default', () => (
  <SSOMenu
    user={{ name: 'Alex Smith', email: 'alex.smith@youwork.com' }}
    activeProduct={ActiveProduct.Atlas}
  />
));
