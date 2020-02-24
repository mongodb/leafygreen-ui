import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import MongoNav from '.';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import { Product, NavItem } from './types';

const setStorybookWidth = css`
  width: 100%;
  margin: 0;
`;

storiesOf('MongoNav', module).add('Default', () => (
  <LeafygreenProvider>
    <div className={setStorybookWidth}>
      <MongoNav
        // mode="dev"
        activeProduct={select(
          'activeProduct',
          Object.values(Product),
          Product.Cloud,
        )}
        activeNav={select('activeNav', Object.values(NavItem), 'accessManager')}
        onOrganizationChange={() => {}}
        onProjectChange={() => {}}
        admin={boolean('admin', true)}
        isOnPrem={boolean('isOnPrem', false)}
      />
    </div>
  </LeafygreenProvider>
));
