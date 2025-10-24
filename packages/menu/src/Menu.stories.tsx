/* eslint-disable react-hooks/rules-of-hooks */

import React, { useRef, useState } from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  type StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';
import { fn, userEvent, within } from '@storybook/test';

import Button from '@leafygreen-ui/button';
import { css, cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import CaretDown from '@leafygreen-ui/icon/dist/CaretDown';
import CloudIcon from '@leafygreen-ui/icon/dist/Cloud';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { Align, Justify, RenderMode } from '@leafygreen-ui/popover';
import { TestUtils } from '@leafygreen-ui/popover';

const { getAlign, getJustify } = TestUtils;

import { useEventListener } from '@leafygreen-ui/hooks';

import {
  Menu,
  MenuGroup,
  MenuItem,
  MenuProps,
  MenuSeparator,
  MenuVariant,
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

const meta: StoryMetaType<typeof Menu> = {
  title: 'Components/Actions/Menu',
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
      ],
    },
    generate: {
      storyNames: [
        'LightModeTopAlign',
        'DarkModeTopAlign',
        'LightModeBottomAlign',
        'DarkModeBottomAlign',
        'LightModeLeftAlign',
        'DarkModeLeftAlign',
        'LightModeRightAlign',
        'DarkModeRightAlign',
      ],
      combineArgs: {
        justify: Object.values(Justify),
      },
      excludeCombinations: [
        {
          align: [Align.CenterHorizontal, Align.CenterVertical],
        },
      ],
      decorator: (Instance, ctx) => (
        <LeafyGreenProvider darkMode={ctx?.args?.darkMode}>
          <div className={getDecoratorStyles(ctx?.args ?? {})}>
            <Instance />
          </div>
        </LeafyGreenProvider>
      ),
    },
  },
  args: {
    align: Align.Bottom,
    renderMode: RenderMode.TopLayer,
    darkMode: false,
    renderDarkMenu: false,
    variant: MenuVariant.Default,
    onOpen: fn(),
  },
  argTypes: {
    open: {
      control: 'boolean',
    },
    darkMode: storybookArgTypes.darkMode,
    renderDarkMenu: {
      description:
        'Whether the menu should always render dark, regardless of the theme context',
      control: 'boolean',
    },
    variant: {
      description: 'The variant of the menu',
      options: Object.values(MenuVariant),
      control: { type: 'select' },
    },
  },
};

export default meta;

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
      </Menu>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
} satisfies StoryObj<typeof Menu>;

export const InitialOpenCompact = {
  render: args => {
    return (
      <Menu
        initialOpen
        trigger={<Button rightGlyph={<CaretDown />}>Menu</Button>}
        {...args}
        variant={MenuVariant.Compact}
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
        'renderMode',
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

const sharedGeneratedStoryArgs = {
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
};

export const LightModeTopAlign = {
  render: <></>,
  args: {
    ...sharedGeneratedStoryArgs,
    darkMode: false,
    align: Align.Top,
  },
};

export const DarkModeTopAlign = {
  render: <></>,
  args: {
    ...sharedGeneratedStoryArgs,
    darkMode: true,
    align: Align.Top,
  },
};

export const LightModeBottomAlign = {
  render: <></>,
  args: {
    ...sharedGeneratedStoryArgs,
    darkMode: false,
    align: Align.Bottom,
  },
};

export const DarkModeBottomAlign = {
  render: <></>,
  args: {
    ...sharedGeneratedStoryArgs,
    darkMode: true,
    align: Align.Bottom,
  },
};

export const LightModeLeftAlign = {
  render: <></>,
  args: {
    ...sharedGeneratedStoryArgs,
    darkMode: false,
    align: Align.Left,
  },
};

export const DarkModeLeftAlign = {
  render: <></>,
  args: {
    ...sharedGeneratedStoryArgs,
    darkMode: true,
    align: Align.Left,
  },
};

export const LightModeRightAlign = {
  render: <></>,
  args: {
    ...sharedGeneratedStoryArgs,
    darkMode: false,
    align: Align.Right,
  },
};

export const DarkModeRightAlign = {
  render: <></>,
  args: {
    ...sharedGeneratedStoryArgs,
    darkMode: true,
    align: Align.Right,
  },
};

interface InitialLongMenuOpenArgs extends MenuProps {}

interface InitialLongMenuOpenStory {
  render: (args: InitialLongMenuOpenArgs) => JSX.Element;
  play: (ctx: { canvasElement: HTMLElement }) => Promise<void>;
  decorators: [(StoryFn: React.FC, _ctx: any) => JSX.Element];
}

export const InitialLongMenuOpen: InitialLongMenuOpenStory = {
  render: (args: InitialLongMenuOpenArgs) => {
    return (
      <Menu
        trigger={
          <Button data-testid="menu-test-trigger" rightGlyph={<CaretDown />}>
            Menu
          </Button>
        }
        open={true}
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
        <MenuItem glyph={<CloudIcon />}>Menu Item</MenuItem>
        <MenuItem glyph={<CloudIcon />}>Menu Item</MenuItem>
        <MenuItem glyph={<CloudIcon />}>Menu Item</MenuItem>
        <MenuItem glyph={<CloudIcon />}>Menu Item</MenuItem>
        <MenuItem glyph={<CloudIcon />}>Menu Item</MenuItem>
        <MenuItem glyph={<CloudIcon />}>Menu Item</MenuItem>
        <MenuItem glyph={<CloudIcon />}>Menu Item</MenuItem>
      </Menu>
    );
  },
  play: async (ctx: { canvasElement: HTMLElement }) => {
    const { findByTestId } = within(ctx.canvasElement.parentElement!);
    const trigger = await findByTestId('menu-test-trigger');
    userEvent.click(trigger);
  },
  decorators: [
    (StoryFn: React.FC, _ctx: any) => (
      <div
        className={css`
          height: 100vh;
          padding: 0;
        `}
      >
        <StoryFn />
      </div>
    ),
  ],
};

export const MovingMenuTrigger = () => {
  const markerStyles = css`
    position: absolute;
    color: black;
    text-align: center;
    outline: 1px solid black;
    cursor: default;
  `;

  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const anchorRef = useRef<HTMLDivElement>(null);
  useEventListener(
    'contextmenu',
    event => {
      event.preventDefault();
      const { clientX, clientY } = event;
      setOpen(true);
      setPosition({ top: clientY, left: clientX });
    },
    { dependencies: [setPosition, setOpen] },
  );
  useEventListener(
    'click',
    event => {
      event.preventDefault();
      if (event.buttons === 2) return;
      setOpen(false);
    },
    { dependencies: [setOpen] },
  );

  return (
    <div className="App">
      <div
        ref={anchorRef}
        style={{ position: 'absolute', width: 1, height: 1, ...position }}
      />
      <div
        className={cx(
          markerStyles,
          css`
            top: 40vh;
            left: 50vw;
          `,
        )}
      >
        Click here for a shorter menu
      </div>
      <div
        className={cx(
          markerStyles,
          css`
            top: 10vh;
            left: 50vw;
          `,
        )}
      >
        Click here for a long menu
      </div>
      <Menu refEl={anchorRef} open={open} maxHeight={Number.MAX_SAFE_INTEGER}>
        <MenuItem>Item #1</MenuItem>
        <MenuItem>Item #2</MenuItem>
        <MenuItem>Item #3</MenuItem>
        <MenuItem>Item #4</MenuItem>
        <MenuItem>Item #5</MenuItem>
        <MenuItem>Item #6</MenuItem>
        <MenuItem>Item #7</MenuItem>
        <MenuItem>Item #8</MenuItem>
        <MenuItem>Item #9</MenuItem>
        <MenuItem>Item #10</MenuItem>
        <MenuItem>Item #11</MenuItem>
        <MenuItem>Item #12</MenuItem>
        <MenuItem>Item #13</MenuItem>
        <MenuItem>Item #14</MenuItem>
        <MenuItem>Item #15</MenuItem>
        <MenuItem>Item #16</MenuItem>
        <MenuItem>Item #17</MenuItem>
        <MenuItem>Item #18</MenuItem>
        <MenuItem>Item #19</MenuItem>
        <MenuItem>Item #20</MenuItem>
      </Menu>
    </div>
  );
};

MovingMenuTrigger.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};
