import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean, text } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import MongoNav from '.';
import LeafygreenProvider from '@leafygreen-ui/leafygreen-provider';
import {
  Product,
  Platform,
  ActiveNavElement,
  Mode,
  Environment,
} from './types';

const setStorybookWidth = css`
  width: 100%;
  margin: 0;
`;

storiesOf('MongoNav', module).add('Default', () => (
  <LeafygreenProvider>
    <div className={setStorybookWidth}>
      <MongoNav
        mode={select('mode', Object.values(Mode), Mode.Dev)}
        activePlatform={select(
          'activePlatform',
          Object.values(Platform),
          Platform.University,
        )}
        activeProduct={select(
          'activeProduct',
          Object.values(Product),
          Product.Cloud,
        )}
        activeNav={select(
          'activeNav',
          Object.values(ActiveNavElement),
          ActiveNavElement.OrgNavAccessManagerDropdown,
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
        environment={select(
          'environment',
          Object.values(Environment),
          Environment.Commercial,
        )}
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
