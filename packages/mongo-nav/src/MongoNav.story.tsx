import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean, text, button } from '@storybook/addon-knobs';
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

const storybookStyles = css`
  position: fixed;
  top: 0;

  width: 100%;
  margin: 0;
`;

storiesOf('MongoNav', module).add('Default', () => {
  const mongoNavRef = React.useRef<{ reloadData: () => void }>(null);

  const [triggerDataReload, setTriggerDataReload] = React.useState(false);

  button('trigger dataReload', () => setTriggerDataReload(curr => !curr));

  React.useEffect(() => {
    if (triggerDataReload) {
      mongoNavRef?.current?.reloadData?.();
    }
  }, [triggerDataReload]);

  return (
    <LeafygreenProvider>
      <div className={storybookStyles}>
        <MongoNav
          ref={mongoNavRef}
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
            currentProject: {
              useCNRegionsOnly: boolean(
                'dataFixtures.currentProject.useCNRegionsOnly',
                false,
              ),
            },
          }}
        />
      </div>
    </LeafygreenProvider>
  );
});
