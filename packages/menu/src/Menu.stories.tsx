/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import React, { useState } from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import CaretDown from '@leafygreen-ui/icon/dist/CaretDown';
import CloudIcon from '@leafygreen-ui/icon/dist/Cloud';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { Align, Justify } from '@leafygreen-ui/popover';
import { TestUtils } from '@leafygreen-ui/popover';

const { getAlign, getJustify } = TestUtils;

import {
  Menu,
  MenuGroup,
  MenuItem,
  MenuProps,
  MenuSeparator,
  SubMenu,
} from '.';

const getDecoratorStyles = (args: Partial<MenuProps>) => {
  return css`
    width: 256px;
    height: 250px;
    display: flex;
    align-items: ${['left', 'right'].includes(args.align!)
      ? 'end'
      : getAlign(args.align!, args.justify!)};
    justify-content: ${getJustify(args.align!, args.justify!)};
  `;
};

export default {
  title: 'Components/Menu',
  component: Menu,
  decorators: [
    (StoryFn, _ctx) => (
      <LeafyGreenProvider darkMode={_ctx?.args?.darkMode}>
        <StoryFn />
      </LeafyGreenProvider>
    ),
  ],
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [
        ...storybookExcludedControlParams,
        'as',
        'children',
        'refEl',
        'portalRef',
        'setOpen',
        'size',
        'trigger',
        'usePortal',
      ],
    },
    chromatic: {
      disableSnapshot: true,
    },
  },
  args: {
    align: 'bottom',
    usePortal: true,
    darkMode: false,
    renderDarkMenu: false,
  },
  argTypes: {
    open: {
      control: 'boolean',
    },
    darkMode: storybookArgTypes.darkMode,
    renderDarkMenu: {
      control: 'boolean',
    },
  },
} satisfies StoryMetaType<typeof Menu>;

export const LiveExample = {
  render: ({ open, darkMode, ...args }) => {
    return (
      <Menu
        darkMode={darkMode}
        trigger={
          <Button darkMode={darkMode} rightGlyph={<CaretDown />}>
            Menu
          </Button>
        }
        open={open}
        {...args}
      >
        <MenuItem glyph={<CloudIcon />}>Menu Item</MenuItem>
        <MenuItem description="I am also a description" glyph={<CloudIcon />}>
          Menu Item
        </MenuItem>
        <MenuItem disabled description="I am a description">
          Disabled Menu Item
        </MenuItem>
        <MenuItem
          disabled
          description="I am a description"
          glyph={<CloudIcon />}
        >
          Disabled Menu Item
        </MenuItem>
        <MenuSeparator />
        <MenuItem href="http://mongodb.design">I am a link!</MenuItem>
        <SubMenu
          title="Menu Item 1"
          description=".design"
          glyph={<CloudIcon />}
          href="http://mongodb.design"
        >
          <MenuItem>SubMenu Item 1</MenuItem>
          <MenuItem active>SubMenu Item 2</MenuItem>
          <MenuItem>SubMenu Item 3</MenuItem>
        </SubMenu>
        <SubMenu title="Menu Item 2" description="Sed posuere">
          <MenuItem>Support 1</MenuItem>
          <MenuItem>Support 2</MenuItem>
        </SubMenu>
        <MenuItem variant="destructive" glyph={<Icon glyph="Trash" />}>
          Delete
        </MenuItem>
        <MenuSeparator />
        <MenuGroup title="Lorem Ipsum">
          <MenuItem>Lorem</MenuItem>
          <MenuItem>Ipsum</MenuItem>
          <MenuItem>Dolor</MenuItem>
          <MenuItem>Sit</MenuItem>
          <MenuItem>Amet</MenuItem>
        </MenuGroup>
      </Menu>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
} satisfies StoryObj<typeof Menu>;

export const InitialOpen = {
  render: args => {
    return (
      <Menu
        initialOpen
        trigger={<Button rightGlyph={<CaretDown />}>Menu</Button>}
        {...args}
      >
        <MenuItem>Lorem</MenuItem>
        <MenuItem>Ipsum</MenuItem>
        <MenuItem>Adipiscing</MenuItem>
      </Menu>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
} satisfies StoryObj<typeof Menu>;

export const Controlled = {
  render: args => {
    const [open, setOpen] = useState(true);

    return (
      <Menu
        open={open}
        setOpen={setOpen}
        trigger={<Button rightGlyph={<CaretDown />}>Menu</Button>}
        {...args}
      >
        <MenuItem>Lorem</MenuItem>
        <MenuItem>Ipsum</MenuItem>
        <MenuItem>Adipiscing</MenuItem>
      </Menu>
    );
  },
  parameters: {
    controls: {
      exclude: [
        ...storybookExcludedControlParams,
        'trigger',
        'children',
        'refEl',
        'setOpen',
        'as',
        'portalRef',
        'usePortal',
        'align',
        'darkMode',
        'justify',
        'renderDarkMenu',
        'size',
      ],
    },
    chromatic: {
      disableSnapshot: true,
    },
  },
} satisfies StoryObj<typeof Menu>;

export const Generated = {
  render: () => <></>,
  args: {
    open: true,
    maxHeight: 200,
    children: (
      <>
        <MenuItem>Lorem</MenuItem>
        <SubMenu
          title="Fruit"
          description="A selection of fruit"
          glyph={<CloudIcon size="large" />}
          active={true}
        >
          <MenuItem active>Apple</MenuItem>
          <MenuItem variant="destructive">Banana</MenuItem>
          <MenuItem>Carrot</MenuItem>
          <MenuItem>Dragonfruit</MenuItem>
          <MenuItem>Eggplant</MenuItem>
          <MenuItem>Fig</MenuItem>
        </SubMenu>
      </>
    ),
    trigger: <Button size="xsmall">trigger</Button>,
  },
  parameters: {
    generate: {
      combineArgs: {
        darkMode: [false, true],
        align: Object.values(Align),
        justify: Object.values(Justify),
      },

      excludeCombinations: [
        {
          align: [Align.CenterHorizontal, Align.CenterVertical],
        },
        {
          justify: Justify.Fit,
          align: [Align.Left, Align.Right],
        },
      ],
      decorator: (Instance, ctx) => (
        <LeafyGreenProvider darkMode={ctx?.args?.darkMode}>
          <div className={getDecoratorStyles(ctx?.args)}>
            <Instance />
          </div>
        </LeafyGreenProvider>
      ),
    },
  },
} satisfies StoryObj<typeof Menu>;
