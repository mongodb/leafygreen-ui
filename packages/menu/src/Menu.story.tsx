import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean, number } from '@storybook/addon-knobs';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { Menu, MenuSeparator, SubMenu, MenuItem } from '.';
import { Align, Justify } from '@leafygreen-ui/popover';
import CloudIcon from '@leafygreen-ui/icon/dist/Cloud';
import LaptopIcon from '@leafygreen-ui/icon/dist/Laptop';
import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';

function Uncontrolled() {
  const size = select('Size', ['default', 'large'], 'default');
  const usePortal = boolean('Use Portal', true);

  return (
    <LeafyGreenProvider>
      <Menu
        align={select('Align', Object.values(Align), Align.Bottom)}
        justify={select('Justify', Object.values(Justify), Justify.Start)}
        trigger={<Button rightGlyph={<CloudIcon />} />}
        popoverZIndex={number('zIndex', 1)}
        usePortal={usePortal}
      >
        <MenuItem active size={size} glyph={<CloudIcon />}>
          Active Menu Item
        </MenuItem>
        <MenuItem description="I am also a description" size={size}>
          Menu Item With Description
        </MenuItem>
        <MenuItem
          disabled={boolean('Disable item', true)}
          description="I am a description"
          size={size}
        >
          Disabled Menu Item
        </MenuItem>
        <MenuItem size={size} href="http://mongodb.design">
          I am a link!
        </MenuItem>
      </Menu>
    </LeafyGreenProvider>
  );
}

function Controlled() {
  const [open, setOpen] = useState(false);
  const size = select('Size', ['default', 'large'], 'default');
  const usePortal = boolean('Use Portal', true);

  return (
    <LeafyGreenProvider>
      <Button onClick={() => setOpen(!open)}>
        trigger
        <Menu
          align={select('Align', Object.values(Align), Align.Bottom)}
          justify={select('Justify', Object.values(Justify), Justify.Start)}
          open={open}
          setOpen={setOpen}
          usePortal={usePortal}
        >
          <MenuItem active size={size} glyph={<LaptopIcon size="large" />}>
            Active Menu Item
          </MenuItem>
          <MenuItem disabled={boolean('Disable item', true)} size={size}>
            Disabled Menu Item
          </MenuItem>
          <MenuItem description="I am a description" size={size}>
            Menu Item With Description
          </MenuItem>
          <MenuItem href="http://mongodb.design" size={size}>
            I am a link!
          </MenuItem>
          <MenuSeparator
            className={css`
              margin: 0;
            `}
          />
          <MenuItem size={size}>Left out of the MenuGroup</MenuItem>
        </Menu>
      </Button>
    </LeafyGreenProvider>
  );
}

function SubMenuExample() {
  return (
    <LeafyGreenProvider>
      <Menu trigger={<Button>trigger</Button>}>
        <SubMenu
          title="Menu Item 1"
          description=".design"
          glyph={<CloudIcon size="large" />}
          active={true}
          href="http://mongodb.design"
        >
          <MenuItem>SubMenu Item 1</MenuItem>
          <MenuItem>SubMenu Item 2</MenuItem>
        </SubMenu>
        <SubMenu
          title="Menu Item 2"
          description="Sed posuere consectetur"
          glyph={<LaptopIcon size="large" />}
        >
          <MenuItem>Support 1</MenuItem>
        </SubMenu>
      </Menu>
    </LeafyGreenProvider>
  );
}

storiesOf('Packages/Menu', module)
  .add('Controlled', () => <Controlled />)
  .add('Uncontrolled', () => <Uncontrolled />)
  .add('With SubMenus', () => <SubMenuExample />);
