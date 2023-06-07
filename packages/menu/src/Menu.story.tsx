/* eslint-disable react/display-name */
import React from 'react';
import { StoryFn } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import CaretDown from '@leafygreen-ui/icon/dist/CaretDown';
import CloudIcon from '@leafygreen-ui/icon/dist/Cloud';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import {
  storybookExcludedControlParams,
  StoryMetaType,
} from '@leafygreen-ui/lib';
import { transitionDuration } from '@leafygreen-ui/tokens';

import { Size } from './types';
import { Menu, MenuItem, MenuProps, MenuSeparator, SubMenu } from '.';

const meta: StoryMetaType<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [
        ...storybookExcludedControlParams,
        'trigger',
        'children',
        'refEl',
        'setOpen',
        'as',
      ],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
      },
      args: {
        open: true,
        children: (
          <>
            <MenuItem>Lorem</MenuItem>
            <SubMenu
              title="Ipsum"
              description="mongodb.design"
              glyph={<CloudIcon size="large" />}
              active={true}
            >
              <MenuItem active>Apple</MenuItem>
              <MenuItem>Banana</MenuItem>
              <MenuItem>Carrot</MenuItem>
            </SubMenu>
          </>
        ),
      },
      decorator: StoryFn => (
        <div
          className={css`
            height: 256px;
          `}
        >
          <StoryFn />
        </div>
      ),
    },
    chromatic: {
      delay: transitionDuration.default,
    },
  },
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
    size: {
      options: Object.values(Size),
      control: 'select',
      description:
        'Size of the `MenuItem` component, can be `default` or `large`',
    },
  },
};
export default meta;

export const LiveExample: StoryFn<MenuProps & { size: Size }> = ({
  open: _,
  size,
  darkMode,
  ...args
}: MenuProps & { size: Size }) => {
  return (
    <LeafyGreenProvider>
      <Menu
        darkMode={darkMode}
        trigger={
          <Button darkMode={darkMode} rightGlyph={<CaretDown />}>
            Menu
          </Button>
        }
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
          <MenuItem>Support 2</MenuItem>
        </SubMenu>
        <MenuSeparator />
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

export const Generated = () => {};
