import React from 'react';
import Icon from '@leafygreen-ui/icon';
import { Menu, MenuItem } from '@leafygreen-ui/menu';
import Button from '@leafygreen-ui/button';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

const knobsConfig: KnobsConfigInterface<{
  active: boolean;
  disabled: boolean;
  children: string;
  usePortal: boolean;
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
  usePortal: {
    type: 'boolean',
    default: true,
    label: 'Use Portal',
  },
};

export default function MenuLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {({ children, active, disabled }) => (
        <Menu trigger={<Button glyph={<Icon glyph="Ellipsis" />}></Button>}>
          <MenuItem active={active}>Edit Data Source Configuration</MenuItem>
          <MenuItem disabled={disabled}>Edit Rules</MenuItem>
          <MenuItem>{children}</MenuItem>
        </Menu>
      )}
    </LiveExample>
  );
}
