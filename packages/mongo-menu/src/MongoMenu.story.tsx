import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import InteractionContext from '@leafygreen-ui/interaction-context';
import MongoMenu, { Product } from '.';

storiesOf('MongoMenu', module).add('Default', () => (
  <InteractionContext initialStates={{ usingKeyboard: false }}>
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
  </InteractionContext>
));
