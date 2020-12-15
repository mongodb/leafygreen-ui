import React, { useState } from 'react';
import Button from '@leafygreen-ui/button';
import { Menu, MenuItem } from '@leafygreen-ui/menu';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

const knobsConfig: KnobsConfigInterface<{
  active: boolean;
  disabled: boolean;
  children: string;
  size: 'default' | 'large';
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
  size: {
    type: 'select',
    default: 'default',
    label: 'Size',
    options: ['default', 'large'],
  },
};

export default function MenuLiveExample() {
  const [open, setOpen] = useState(false);

  return (
    <LiveExample knobsConfig={knobsConfig}>
      {({ children, active, disabled, size }) => {
        return (
          <Button onClick={() => setOpen(curr => !curr)}>
            Trigger
            <Menu open={open}>
              <MenuItem size={size} active={active}>
                Edit Data Source Configuration
              </MenuItem>
              <MenuItem size={size}>Edit Rules</MenuItem>
              <MenuItem size={size} disabled={disabled}>
                {children}
              </MenuItem>
            </Menu>
          </Button>
        );
      }}
    </LiveExample>
  );
}
