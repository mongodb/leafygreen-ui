import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import MongoNav from '.';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import { Product, NavItem } from './types';

storiesOf('MongoNav', module).add('Default', () => (
  <LeafygreenProvider>
    <MongoNav
      mode="dev"
      activeProduct={select(
        'activeProduct',
        Object.values(Product),
        Product.Cloud,
      )}
      activeNav={select('activeNav', Object.values(NavItem), 'accessManager')}
      onOrganizationChange={() => {}}
      onProjectChange={() => {}}
      admin={boolean('admin', true)}
    />
  </LeafygreenProvider>
));
