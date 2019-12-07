import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import MongoMenu, { Product } from '.';

const user = {
  name: text('name', 'Alex Smith'),
  email: text('email', 'alex.smith@mongodb.com'),
};

const activeProduct = select(
  'activeProduct',
  Object.values(Product) as Array<Product>,
  Product.Atlas,
);

storiesOf('MongoMenu', module)
  .add('Default', () => <MongoMenu user={user} activeProduct={activeProduct} />)
  .add('Disabled MongoDB Account link', () => (
    <MongoMenu user={user} activeProduct={activeProduct} accountURL={''} />
  ));
