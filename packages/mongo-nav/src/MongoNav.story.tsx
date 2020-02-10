import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import MongoNav from '.';
import { Product, NavItem } from './types';

const setStorybookWidth = css`
  width: 100%:
`;

storiesOf('MongoNav', module).add('Default', () => (
  <div className={setStorybookWidth}>
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
  </div>
));
