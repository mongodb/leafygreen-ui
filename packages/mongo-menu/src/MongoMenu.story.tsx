import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import LeafyGreenContext from '@leafygreen-ui/leafygreen-context';
import MongoMenu, { Product } from '.';

storiesOf('MongoMenu', module).add('Default', () => (
  <LeafyGreenContext initialStates={{ usingKeyboard: false }}>
    <MongoMenu
      user={{
        name: text('name', 'Alex Smith'),
        email: text('email', 'alex.smith@mongodb.com'),
      }}
      activeProduct={select(
        'activeProduct',
        Object.values(Product) as Array<typeof Product[keyof typeof Product]>,
        Product.Atlas,
      )}
    />
  </LeafyGreenContext>
));
