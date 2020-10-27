import React from 'react';
import CloudIcon from '@leafygreen-ui/icon/dist/Cloud';
import IconButton, { AccessibleIconButtonProps, Size } from './IconButton';
import LiveExample, { KnobsConfigInterface } from '@leafygreen-ui/live-example';

const knobsConfig: KnobsConfigInterface<Partial<AccessibleIconButtonProps>> = {
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

const IconButtonLiveExample = () => {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => (
        <IconButton aria-label="Cloud" {...props}>
          <CloudIcon />
        </IconButton>
      )}
    </LiveExample>
  );
};

export { IconButtonLiveExample };
