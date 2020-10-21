import React from 'react';
import LiveExample, { KnobType } from '@leafygreen-ui/live-example';
import Badge, { Variant } from '.';

const knobsConfig = {
  variant: {
    type: KnobType.Select,
    options: Object.values(Variant),
    default: Variant.Blue,
    label: 'Variant',
  },
  children: {
    type: KnobType.Text,
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

export { BadgeLiveExample };
