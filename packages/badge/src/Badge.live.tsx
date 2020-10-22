import React from 'react';
import LiveExample, {
  KnobsConfigInterface,
  KnobType,
} from '@leafygreen-ui/live-example';
import Badge, { BadgeProps, Variant } from './Badge';

const knobsConfig: KnobsConfigInterface<Partial<BadgeProps>> = {
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
  console.log('inside badge');
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => <Badge {...props} />}
    </LiveExample>
  );
};

export { BadgeLiveExample };
