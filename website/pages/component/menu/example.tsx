import React, { useState } from 'react';
import { Menu, MenuItem } from '@leafygreen-ui/menu';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

const knobsConfig: KnobsConfigInterface<{
  active: boolean;
  disabled: boolean;
  children: string;
}> = {
  active: {
    type: 'boolean',
    default: true,
    label: 'Active',
  },
  disabled: {
    type: 'boolean',
    default: false,
    label: 'Disabled',
  },
  children: {
    type: 'text',
    default: 'Unlink Data source',
    label: 'Children',
  },
};

export default function MenuLiveExample() {
  const [open, setOpen] = useState(false);

  return (
    <LiveExample knobsConfig={knobsConfig}>
      {({ children, active, disabled }) => {
        return (
          <button onClick={() => setOpen(!open)}>
            Trigger
            <Menu open={open} setOpen={setOpen}>
              <MenuItem active={active}>
                Edit Data Source Configuration
              </MenuItem>
              <MenuItem disabled={disabled} size="large">
                Edit Rules
              </MenuItem>
              <MenuItem description="I am a description" size="large">
                {children}
              </MenuItem>
            </Menu>
          </button>
        );
      }}
    </LiveExample>
  );
}
