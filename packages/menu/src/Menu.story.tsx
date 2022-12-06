import React, { useState } from 'react';

import Button from '@leafygreen-ui/button';
import CloudIcon from '@leafygreen-ui/icon/dist/Cloud';
import EllipsisIcon from '@leafygreen-ui/icon/dist/Ellipsis';
import IconButton from '@leafygreen-ui/icon-button';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { storybookArgTypes } from '@leafygreen-ui/lib';

import { Size } from './types';
import { Menu, MenuItem, MenuProps, MenuSeparator, SubMenu } from '.';

export default {
  title: 'Components/Menu',
  component: Menu,
  args: {
    open: true,
    align: 'bottom',
    usePortal: true,
    darkMode: false,
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
    darkMode: storybookArgTypes.darkMode,
    size: {
      options: Object.values(Size),
      control: 'select',
      description:
        'Size of the `MenuItem` component, can be `default` or `large`',
    },
  },
};

export const UncontrolledTemplate = ({
  size,
  open,
  darkMode,
  ...args
}: MenuProps & { size: Size }) => {
  return (
    <LeafyGreenProvider>
      <Menu
        trigger={
          <IconButton darkMode={darkMode} aria-label="label">
            <EllipsisIcon />
          </IconButton>
        }
        darkMode={darkMode}
        {...args}
      >
        <MenuItem
          description="I am also an active description"
          active
          size={size}
          glyph={<CloudIcon />}
        >
          Active Menu Item
        </MenuItem>
        <MenuItem
          description="I am also a description"
          size={size}
          glyph={<CloudIcon />}
        >
          Menu Item With Description
        </MenuItem>
        <MenuItem disabled description="I am a description" size={size}>
          Disabled Menu Item
        </MenuItem>
        <MenuItem size={size} href="http://mongodb.design">
          I am a link!
        </MenuItem>
        <MenuItem size={size}>Lorem</MenuItem>
        <MenuItem size={size}>Ipsum</MenuItem>
        <MenuItem size={size}>Adipiscing</MenuItem>
        <MenuItem size={size}>Cursus</MenuItem>
        <MenuItem size={size}>Ullamcorper</MenuItem>
        <MenuItem size={size}>Vulputate</MenuItem>
        <MenuItem size={size}>Inceptos</MenuItem>
        <MenuItem size={size}>Risus</MenuItem>
      </Menu>
    </LeafyGreenProvider>
  );
};
UncontrolledTemplate.storyName = 'Uncontrolled';

export const SubMenuExample = ({
  size,
  darkMode,
  ...args
}: MenuProps & { size: Size }) => {
  return (
    <LeafyGreenProvider>
      <Menu
        darkMode={darkMode}
        trigger={<Button darkMode={darkMode} rightGlyph={<EllipsisIcon />} />}
        {...args}
      >
        <MenuItem size={size} glyph={<CloudIcon />}>
          Menu Item
        </MenuItem>
        <MenuItem
          description="I am also a description"
          size={size}
          glyph={<CloudIcon />}
        >
          Menu Item
        </MenuItem>
        <MenuItem disabled description="I am a description" size={size}>
          Disabled Menu Item
        </MenuItem>
        <MenuItem
          disabled
          description="I am a description"
          size={size}
          glyph={<CloudIcon />}
        >
          Disabled Menu Item
        </MenuItem>
        <MenuSeparator />
        <MenuItem size={size} href="http://mongodb.design">
          I am a link!
        </MenuItem>
        <SubMenu
          title="Menu Item 1"
          description=".design"
          glyph={<CloudIcon size="large" />}
          active={true}
          href="http://mongodb.design"
          size={size}
        >
          <MenuItem active>SubMenu Item 1</MenuItem>
          <MenuItem>SubMenu Item 2</MenuItem>
          <MenuItem>SubMenu Item 3</MenuItem>
        </SubMenu>
        <SubMenu title="Menu Item 2" description="Sed posuere" size={size}>
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
  darkMode,
  ...args
}: MenuProps & { size: Size }) => {
  const [isOpen, setIsOpen] = useState(open);
  return UncontrolledTemplate({
    size,
    open: isOpen,
    trigger: (
      <Button
        onClick={() => setIsOpen(o => !o)}
        rightGlyph={<EllipsisIcon />}
        darkMode={darkMode}
      />
    ),
    darkMode,
    ...args,
  });
};
