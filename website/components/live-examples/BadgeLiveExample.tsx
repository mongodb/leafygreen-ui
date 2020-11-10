import React from 'react';
import LiveExample from '@leafygreen-ui/live-example';
import type { KnobsConfigInterface } from '@leafygreen-ui/live-example';
import Badge, { Variant } from '@leafygreen-ui/badge';

const knobsConfig: KnobsConfigInterface<{
  variant: Variant;
  children: string;
}> = {
  variant: {
    type: 'select',
    options: Object.values(Variant),
    default: Variant.Blue,
    label: 'Variant',
  },
  children: {
    type: 'text',
    default: 'Button',
    label: 'Children',
  },
};

const BadgeLiveExample = () => {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => <Badge {...props} />}
    </LiveExample>
  );
};

export default BadgeLiveExample;
