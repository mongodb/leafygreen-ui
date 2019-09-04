import React from 'react';
import { storiesOf } from '@storybook/react';
import SSOMenu from '.';

storiesOf('SSOMenu', module).add('Default', () => (
  <SSOMenu
    user={{ name: 'Alex Smith', email: 'alex.smith@mongodb.com' }}
    activeProduct="atlas"
  />
));
