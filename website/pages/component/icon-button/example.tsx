import React from 'react';
import CloudIcon from '@leafygreen-ui/icon/dist/Cloud';
import IconButton, { Size } from '@leafygreen-ui/icon-button';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

const knobsConfig: KnobsConfigInterface<{
  active: boolean;
  disabled: boolean;
  darkMode: boolean;
  size: Size;
}> = {
  active: {
    type: 'boolean',
    default: false,
    label: 'Active',
  },
  disabled: {
    type: 'boolean',
    default: false,
    label: 'Disabled',
  },
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
};

export default function IconButtonLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => (
        <IconButton aria-label="Cloud" {...props}>
          <CloudIcon />
        </IconButton>
      )}
    </LiveExample>
  );
}
