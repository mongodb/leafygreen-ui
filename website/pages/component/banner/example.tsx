import React from 'react';
import Banner, { Variant } from '@leafygreen-ui/banner';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

const knobsConfig: KnobsConfigInterface<{
  variant?: Variant;
  dismissible: boolean;
  children: string;
}> = {
  variant: {
    type: 'select',
    options: Object.values(Variant),
    default: Variant.Info,
    label: 'Variant',
  },
  dismissible: {
    type: 'boolean',
    default: false,
    label: 'Dismissible',
  },
  children: {
    type: 'area',
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
