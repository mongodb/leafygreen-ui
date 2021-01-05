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
    label: 'Dark Mode',
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
      {props => (
        <>
          <label style={{ display: 'block' }} id="label" htmlFor="toggle">
            This is an accessible label for the Toggle
          </label>
          <Toggle id="toggle" aria-labelledby="label" {...props} />
        </>
      )}
    </LiveExample>
  );
}
