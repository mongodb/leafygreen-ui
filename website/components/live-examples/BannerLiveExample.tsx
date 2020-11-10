import React from 'react';
import LiveExample, {
  KnobType,
  KnobsConfigInterface,
} from '@leafygreen-ui/live-example';
import Banner, { Variant } from '@leafygreen-ui/banner';

const knobsConfig: KnobsConfigInterface<{
  variant: Variant;
  dismissible: boolean;
  children: string;
}> = {
  variant: {
    type: KnobType.Select,
    options: Object.values(Variant),
    default: Variant.Success,
    label: 'Variant',
  },
  dismissible: {
    type: KnobType.Boolean,
    default: false,
    label: 'Dismissable',
  },
  children: {
    type: KnobType.Text,
    default:
      'To avoid disrupting majority writes, new members are now added to replica sets as priority=0, votes=0 until they reach secondary state, after which Cloud Manager automatically updates the configuration to match the priority and votes value specified in the deployment.',
    label: 'Children',
  },
};

const BannerLiveExample = () => {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => <Banner {...props} />}
    </LiveExample>
  );
};

export default BannerLiveExample;
