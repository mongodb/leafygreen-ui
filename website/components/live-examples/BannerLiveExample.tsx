import React from 'react';
import LiveExample, { KnobsConfigInterface } from '@leafygreen-ui/live-example';
import Banner, { Variant } from '@leafygreen-ui/banner';

const knobsConfig: KnobsConfigInterface<{
  variant: Variant;
  dismissible: boolean;
  children: string;
}> = {
  variant: {
    type: 'select',
    options: Object.values(Variant),
    default: Variant.Success,
    label: 'Variant',
  },
  dismissible: {
    type: 'boolean',
    default: false,
    label: 'Dismissable',
  },
  children: {
    type: 'text',
    default:
      'To avoid disrupting majority writes, new members are now added to replica sets as priority=0, votes=0 until they reach secondary state, after which Cloud Manager automatically updates the configuration to match the priority and votes value specified in the deployment.',
    label: 'Children',
  },
};

export default function BannerLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => <Banner {...props} />}
    </LiveExample>
  );
}
