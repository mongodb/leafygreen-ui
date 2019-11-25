import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import MongoMenu, { Product } from '.';

storiesOf('MongoMenu', module).add('Default', () => (
  <MongoMenu
    user={{
      name: text('name', 'Alex Smith'),
      email: text('email', 'alex.smith@mongodb.com'),
    }}
    activeProduct={select(
      'activeProduct',
      Object.values(Product) as Array<Size>,
      Product.Atlas,
    )}
  />
));
