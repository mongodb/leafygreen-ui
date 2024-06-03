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

const _withMenuContext =
  (): InstanceDecorator<typeof MenuItem & typeof Menu> => (Instance, ctx) => {
    return (
      <MenuContext.Provider
        value={{
          highlightIndex: ctx?.args?.highlighted ? -1 : undefined,
          darkMode: ctx?.args?.darkMode ?? false,
          theme: ctx?.args?.darkMode ? Theme.Dark : Theme.Light,
        }}
      >
        <ul
          className={css`
            width: 256px;
          `}
        >
          <Instance />
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
      storyNames: ['Default', 'Active', 'Focused', 'Destructive', 'Disabled'],
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
    description: { control: 'text' },
    glyph: {
      control: 'select',
      options: [undefined, ...Object.keys(glyphs)],
    },
    size: {
      control: 'select',
      options: Object.values(Size),
    },
  },
  render: ({ children, glyph, ...args }) => (
    // @ts-expect-error
    <MenuItem {...args} glyph={glyph && <Icon glyph={glyph} />}>
      {children}
    </MenuItem>
  ),
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
