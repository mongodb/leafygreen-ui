import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean, text } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import MongoNav from '.';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import { Product, ActiveNavElement } from './types';

const setStorybookWidth = css`
  width: 100%;
  margin: 0;
`;

storiesOf('MongoNav', module).add('Default', () => (
  <LeafygreenProvider>
    <div className={setStorybookWidth}>
      <MongoNav
        mode="dev"
        activeProduct={select(
          'activeProduct',
          Object.values(Product),
          Product.Cloud,
        )}
        activeNav={select(
          'activeNav',
          Object.values(ActiveNavElement),
          'orgNavAccessManager',
        )}
        admin={boolean('admin', true)}
        onPrem={{
          mfa: true,
          version: '4.4.0',
          enabled: boolean('onPrem enabled', false),
        }}
        onElementClick={(a, b) => console.log(a, b)}
        loadData={boolean('loadData', true)}
        showProjectNav={boolean('showProjectNav', true)}
        dataFixtures={{
          currentOrganization: {
            orgName: text(
              'dataFixtures.currentOrganization.orgName',
              'Demo Organization',
            ),
          },
        }}
      />
    </div>
  </LeafygreenProvider>
));
