import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import MongoNav from '.';
import data from './data';
import { Product, NavItem } from './types';

storiesOf('MongoNav', module).add('Default', () => (
  <MongoNav
    data={data}
    activeProduct={select(
      'activeProduct',
      Object.values(Product),
      Product.Cloud,
    )}
    activeNav={select('activeNav', Object.values(NavItem), 'accessManager')}
    onOrganizationChange={() => {}}
    onProjectChange={() => {}}
  />
));
