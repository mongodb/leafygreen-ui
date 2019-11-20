import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { Menu, MenuSeparator, MenuItem } from './index';
import { Align, Justify } from '@leafygreen-ui/popover';

function Uncontrolled() {
  return (
    <LeafyGreenProvider>
      <Menu
        align={select('Align', Object.values(Align), Align.Bottom)}
        justify={select('Justify', Object.values(Justify), Justify.Start)}
        trigger={<button>trigger</button>}
      >
        <MenuItem active>Active Menu Item</MenuItem>
        <MenuItem
          disabled={boolean('Disabled', true)}
          description="I am a description"
        >
          Disabled Menu Item
        </MenuItem>
        <MenuItem description="I am also a description">
          Menu Item With Description
        </MenuItem>
        <MenuItem href="http://mongodb.design">I am a link!</MenuItem>
      </Menu>
    </LeafyGreenProvider>
  );
}

function Controlled() {
  const [open, setOpen] = useState(false);
  return (
    <LeafyGreenProvider>
      <button onClick={() => setOpen(!open)}>
        trigger
        <Menu
          align={select('Align', Object.values(Align), Align.Bottom)}
          justify={select('Justify', Object.values(Justify), Justify.Start)}
          open={open}
          setOpen={setOpen}
        >
          <MenuItem active>Active Menu Item</MenuItem>
          <MenuItem disabled={boolean('Disabled', true)}>
            Disabled Menu Item
          </MenuItem>
          <MenuItem description="I am a description">
            Menu Item With Description
          </MenuItem>
          <MenuItem href="http://mongodb.design">I am a link!</MenuItem>
          <MenuSeparator />
          <MenuItem>Left out of the MenuGroup</MenuItem>
        </Menu>
      </button>
    </LeafyGreenProvider>
  );
}

storiesOf('Menu', module)
  .add('Controlled', () => <Controlled />)
  .add('Uncontrolled', () => <Uncontrolled />);
