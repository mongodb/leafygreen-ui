import React from 'react';
import LiveExample, { KnobsConfigInterface } from '@leafygreen-ui/live-example';
import MongoNav from './MongoNav';
import {
  MongoNavInterface,
  Mode,
  Platform,
  Product,
  ActiveNavElement,
  Environment,
} from './types';
import { css } from '@leafygreen-ui/emotion/src';

const knobsConfig: KnobsConfigInterface<MongoNavInterface> = {
  activePlatform: {
    type: 'select',
    options: Object.values(Platform),
    default: Platform.University,
    label: 'Active Platform',
  },
  activeProduct: {
    type: 'select',
    options: Object.values(Product),
    default: Product.Cloud,
    label: 'Active Product',
  },
  activeNav: {
    type: 'select',
    options: Object.values(ActiveNavElement),
    default: ActiveNavElement.OrgNavAccessManagerDropdown,
    label: 'Active Nav',
  },
  showProjectNav: {
    type: 'boolean',
    default: true,
    label: 'Show Project Nav',
  },
  environment: {
    type: 'select',
    options: Object.values(Environment),
    default: Environment.Commercial,
    label: 'Environment',
  },
};

const MongoNavLiveExample = () => {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {({ onPrem, ...props }) => (
        <MongoNav
          {...props}
          mode="dev"
          onPrem={{ version: '4.4.0', mfa: true, enabled: !!onPrem }}
          className={css`
            transform: scale(0.8);
          `}
        />
      )}
    </LiveExample>
  );
};

export { MongoNavLiveExample };
