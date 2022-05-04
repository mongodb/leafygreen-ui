import React, { useState } from 'react';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { Menu, MenuProps, SubMenu, MenuItem } from '.';
import CloudIcon from '@leafygreen-ui/icon/dist/Cloud';
import LaptopIcon from '@leafygreen-ui/icon/dist/Laptop';
import Button from '@leafygreen-ui/button';
import { Size } from './types';

export default {
  title: 'Packages/Menu',
  component: Menu,
  args: {
    open: true,
    align: 'bottom',
    usePortal: true,
    trigger: <Button rightGlyph={<CloudIcon />} />,
  },
  argTypes: {
    open: {
      control: 'boolean',
    },
    usePortal: {
      control: 'boolean',
    },
    trigger: {
      control: false,
    },
    children: {
      control: false,
    },
    refEl: {
      control: false,
    },
    setOpen: {
      control: false,
    },
    className: {
      type: 'string',
    },
  },
};

export const UncontrolledTemplate = ({
  size,
  open,
  trigger,
  ...args
}: MenuProps & { size: Size }) => {
  return (
    <LeafyGreenProvider>
      <Menu open={open} trigger={trigger} {...args}>
        <MenuItem active size={size} glyph={<CloudIcon />}>
          Active Menu Item
        </MenuItem>
        <MenuItem description="I am also a description" size={size}>
          Menu Item With Description
        </MenuItem>
        <MenuItem disabled description="I am a description" size={size}>
          Disabled Menu Item
        </MenuItem>
        <MenuItem size={size} href="http://mongodb.design">
          I am a link!
        </MenuItem>
      </Menu>
    </LeafyGreenProvider>
  );
};
UncontrolledTemplate.storyName = 'Uncontrolled';

export const SubMenuExample = ({
  size,
  ...args
}: MenuProps & { size: Size }) => {
  return (
    <LeafyGreenProvider>
      <Menu {...args}>
        <MenuItem active size={size} glyph={<CloudIcon />}>
          Active Menu Item
        </MenuItem>
        <MenuItem description="I am also a description" size={size}>
          Menu Item With Description
        </MenuItem>
        <MenuItem disabled description="I am a description" size={size}>
          Disabled Menu Item
        </MenuItem>
        <MenuItem size={size} href="http://mongodb.design">
          I am a link!
        </MenuItem>
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
};
UncontrolledTemplate.storyName = 'Uncontrolled';

export const Controlled = ({
  size,
  open,
  trigger,
  ...args
}: MenuProps & { size: Size }) => {
  const [isOpen, setIsOpen] = useState(open);
  return UncontrolledTemplate({
    size,
    open: isOpen,
    trigger: (
      <Button onClick={() => setIsOpen(o => !o)} rightGlyph={<CloudIcon />} />
    ),
    ...args,
  });
};
