import React from 'react';
import LiveExample, { KnobsConfigInterface } from '@leafygreen-ui/live-example';
import Toggle, { Size } from '@leafygreen-ui/toggle';

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

const ToggleLiveExample = () => {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => <Toggle {...props} />}
    </LiveExample>
  );
};

export default ToggleLiveExample;
