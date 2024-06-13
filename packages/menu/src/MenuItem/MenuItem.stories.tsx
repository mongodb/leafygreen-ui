/* eslint-disable react/jsx-key */
/* eslint-disable react/display-name */
import React from 'react';
import { InstanceDecorator, StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import Icon, { glyphs } from '@leafygreen-ui/icon';
import { Theme } from '@leafygreen-ui/lib';

import { Menu, MenuProps } from '../Menu';
import { MenuContext } from '../MenuContext';
import { Size } from '../types';

import { MenuItem, Variant } from '.';

/** Implements a MenuContext wrapper around each `MenuItem` */
const _withMenuContext =
  (): InstanceDecorator<typeof MenuItem & typeof Menu> => (Instance, ctx) => {
    const {
      args: { darkMode: darkModeProp, renderDarkMenu, highlighted, ...props },
    } = ctx ?? {
      args: {
        darkMode: false,
        renderDarkMenu: false,
        highlighted: false,
      },
    };

    const darkMode = (renderDarkMenu || darkModeProp) ?? false;
    const theme = darkMode ? Theme.Dark : Theme.Light;

    return (
      <MenuContext.Provider
        value={{
          highlightIndex: highlighted ? -1 : undefined,
          darkMode,
          theme,
        }}
      >
        <ul
          className={css`
            width: 256px;
          `}
        >
          <MenuItem {...props} />
        </ul>
      </MenuContext.Provider>
    );
  };

export default {
  title: 'Components/Menu/MenuItem',
  component: MenuItem,
  args: {
    children: 'Menu Item',
    active: false,
  },
  parameters: {
    default: null,
    generate: {
      storyNames: [
        'Default',
        'Active',
        'Focused',
        'Destructive',
        'Disabled',
        'DarkInLightMode',
      ],
      combineArgs: {
        darkMode: [false, true],
        description: [undefined, 'This is a description'],
        glyph: [undefined, <Icon glyph="Cloud" />],
        size: [Size.Default, Size.Large],
      },
      decorator: _withMenuContext(),
    },
  },
} satisfies StoryMetaType<typeof MenuItem, Partial<MenuProps>>;

export const LiveExample = {
  args: {
    as: 'button',
    description: 'Description',
    glyph: undefined,
  },
  argTypes: {
    active: { control: 'boolean' },
    description: { control: 'text' },
    glyph: {
      control: 'select',
      options: [undefined, ...Object.keys(glyphs)],
    },
    highlighted: { control: 'boolean' },
    size: {
      control: 'select',
      options: Object.values(Size),
    },
    renderDarkMenu: { control: 'boolean' },
  },
  render: ({ children, glyph, ...args }) => (
    // @ts-expect-error - Polymorphic issues - type of href is not compatible
    <MenuItem {...args} glyph={glyph && <Icon glyph={glyph} />}>
      {children}
    </MenuItem>
  ),
  decorators: [_withMenuContext()],
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
} satisfies StoryObj<typeof MenuItem>;

export const Default = {
  render: () => <></>,
} satisfies StoryObj<typeof MenuItem>;

export const Active = {
  render: () => <></>,
  args: {
    active: true,
  },
} satisfies StoryObj<typeof MenuItem>;

export const Focused = {
  render: () => <></>,
  args: {
    highlighted: true,
  },
} satisfies StoryObj<typeof MenuItem>;

export const Disabled = {
  render: () => <></>,
  args: {
    disabled: true,
  },
} satisfies StoryObj<typeof MenuItem>;

export const Destructive = {
  render: () => <></>,
  args: {
    variant: Variant.Destructive,
    active: false,
  },
  parameters: {
    generate: {
      combineArgs: {
        disabled: [false, true],
      },
    },
  },
} satisfies StoryObj<typeof MenuItem>;

export const DarkInLightMode = {
  render: () => <></>,
  parameters: {
    generate: {
      args: {
        darkMode: false,
        description: 'This is a description',
        glyph: <Icon glyph="Cloud" />,
        size: Size.Default,
        renderDarkMenu: true,
      },
      combineArgs: {
        active: [false, true],
        highlighted: [false, true],
        disabled: [false, true],
      },
    },
  },
};
