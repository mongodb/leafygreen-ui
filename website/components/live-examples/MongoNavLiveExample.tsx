import React from 'react';
import LiveExample, { KnobsConfigInterface } from '@leafygreen-ui/live-example';
import MongoNav, {
  Platform,
  Product,
  ActiveNavElement,
} from '@leafygreen-ui/mongo-nav';
import { css } from '@leafygreen-ui/emotion';

const knobsConfig: KnobsConfigInterface<{
  activePlatform: Platform;
  activeProduct: Product;
  activeNav: ActiveNavElement;
  showProjectNav: boolean;
  environment: 'commercial' | 'government';
}> = {
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
    options: ['commercial', 'government'],
    default: 'commercial',
    label: 'Environment',
  },
};

const MongoNavLiveExample = () => {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => (
        <MongoNav
          {...props}
          mode="dev"
          className={css`
            transform: scale(0.8);
          `}
        />
      )}
    </LiveExample>
  );
};

export default MongoNavLiveExample;
