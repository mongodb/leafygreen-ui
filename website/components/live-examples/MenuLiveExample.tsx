import React from 'react';
import LiveExample, { KnobsConfigInterface } from '@leafygreen-ui/live-example';
import Icon from '@leafygreen-ui/icon';
import { Menu, MenuItem } from '@leafygreen-ui/menu';
import Button from '@leafygreen-ui/button'


const knobsConfig: KnobsConfigInterface<{ active: boolean; disabled: boolean; children: string }> = {
  active: {
    type: 'boolean',
    default: true,
    label: 'Active'
  },
  disabled: {
    type: 'boolean',
    default: false,
    label: 'Disabled'
  },
  children: {
    type: 'text',
    default: 'Unlink Data source',
    label: 'Children'
  }
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
