/* eslint-disable react/jsx-key */
/* eslint-disable react/display-name */
import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import Icon, { glyphs } from '@leafygreen-ui/icon';
import { Theme } from '@leafygreen-ui/lib';

import { MenuProps } from '../Menu/Menu.types';
import { MenuContext } from '../MenuContext';
import { Size } from '../types';

import MenuItem from './MenuItem';

export default {
  title: 'Components/Menu/MenuItem',
  component: MenuItem,
  args: {
    children: 'Menu Item',
    active: true,
  },
  parameters: {
    default: null,
    generate: {
      storyNames: ['Default', 'Destructive', 'Disabled'],
      combineArgs: {
        darkMode: [false, true],
        description: [undefined, 'This is a description'],
        glyph: [undefined, <Icon glyph="Cloud" size="large" />],
        active: [false, true],
      },

      decorator: (Instance, ctx) => {
        return (
          <MenuContext.Provider
            value={{
              darkMode: ctx?.args?.darkMode ?? false,
              theme: ctx?.args?.darkMode ? Theme.Dark : Theme.Light,
            }}
          >
            <div
              className={css`
                width: 200px;
              `}
            >
              <Instance />
            </div>
          </MenuContext.Provider>
        );
      },
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

export const Disabled = {
  render: () => <></>,
  args: {
    disabled: true,
  },
} satisfies StoryObj<typeof MenuItem>;

export const Destructive = {
  render: () => <></>,
  args: {
    variant: 'destructive',
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
