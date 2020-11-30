import React from 'react';
import Toggle, { Size } from '@leafygreen-ui/toggle';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

const knobsConfig: KnobsConfigInterface<{
  darkMode: boolean;
  size: Size;
  disabled: boolean;
}> = {
  darkMode: {
    type: 'boolean',
    default: false,
    label: 'Dark mode',
  },
  size: {
    type: 'select',
    options: Object.values(Size),
    default: Size.Default,
    label: 'Size',
  },
  disabled: {
    type: 'boolean',
    default: false,
    label: 'Disabled',
  },
};

export default function ToggleLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => <Toggle {...props} />}
    </LiveExample>
  );
}
