import React from 'react';
import LiveExample, { KnobType } from '@leafygreen-ui/live-example';
import Banner, { Variant } from '.';

const knobsConfig = {
  variant: {
    type: KnobType.Select,
    options: Object.values(Variant),
    default: Variant.Success,
    label: 'Variant',
  },
  dismissable: {
    type: KnobType.Boolean,
    default: false,
    label: 'Dismissable',
  },
  children: {
    type: KnobType.Text,
    default: 'Button',
    label:
      'To avoid disrupting majority writes, new members are now added to replica sets as priority=0, votes=0 until they reach secondary state, after which Cloud Manager automatically updates the configuration to match the priority and votes value specified in the deployment.',
  },
};

const BannerLiveExample = () => {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => <Banner {...props} />}
    </LiveExample>
  );
};

export { BannerLiveExample };
