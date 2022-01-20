import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean, number } from '@storybook/addon-knobs';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { Menu, MenuSeparator, SubMenu, MenuItem } from '.';
import { Align, Justify } from '@leafygreen-ui/popover';
import CloudIcon from '@leafygreen-ui/icon/dist/Cloud';
import LaptopIcon from '@leafygreen-ui/icon/dist/Laptop';

function Uncontrolled() {
  return (
    <LeafyGreenProvider>
      <Menu
        align={select('Align', Object.values(Align), Align.Bottom)}
        justify={select('Justify', Object.values(Justify), Justify.Start)}
        trigger={<button>trigger</button>}
        spacing={number('spacing', 15)}
        popoverZIndex={number('zIndex', 1)}
      >
        <MenuItem
          active
          size={select('Size', ['default', 'large'], 'default')}
          glyph={<CloudIcon />}
        >
          Active Menu Item
        </MenuItem>
        <MenuItem description="I am also a description">
          Menu Item With Description
        </MenuItem>
        <MenuItem
          disabled={boolean('Disable item', true)}
          description="I am a description"
        >
          Disabled Menu Item
        </MenuItem>

        <MenuItem href="http://mongodb.design">I am a link!</MenuItem>
      </Menu>
    </LeafyGreenProvider>
  );
}

function Controlled() {
  const [open, setOpen] = useState(true);
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
          <MenuItem
            active
            size={select('Size', ['default', 'large'], 'large')}
            glyph={<LaptopIcon size="xlarge" />}
          >
            Active Menu Item
          </MenuItem>
          <MenuItem disabled={boolean('Disable item', true)} size="large">
            Disabled Menu Item
          </MenuItem>
          <MenuItem description="I am a description" size="large">
            Menu Item With Description
          </MenuItem>
          <MenuItem href="http://mongodb.design" size="large">
            I am a link!
          </MenuItem>
          <MenuSeparator />
          <MenuItem size="large">Left out of the MenuGroup</MenuItem>
        </Menu>
      </button>
    </LeafyGreenProvider>
  );
}

function SubMenuExample() {
  return (
    <LeafyGreenProvider>
      <Menu trigger={<button>trigger</button>}>
        <SubMenu
          title="Menu Item 1"
          description="https://google.com"
          glyph={<CloudIcon size="xlarge" />}
          active={true}
          href="http://mongodb.design"
        >
          <MenuItem>SubMenu Item 1</MenuItem>
          <MenuItem>SubMenu Item 2</MenuItem>
        </SubMenu>
        <SubMenu
          title="Menu Item 2"
          description="Sed posuere consectetur"
          glyph={<LaptopIcon size="xlarge" />}
        >
          <MenuItem>Support 1</MenuItem>
        </SubMenu>
      </Menu>
    </LeafyGreenProvider>
  );
}

storiesOf('Menu', module)
  .add('Controlled', () => <Controlled />)
  .add('Uncontrolled', () => <Uncontrolled />)
  .add('With SubMenus', () => <SubMenuExample />);
