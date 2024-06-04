/* eslint-disable react/jsx-key */
/* eslint-disable react/display-name */
import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';

import Icon from '@leafygreen-ui/icon';
import { Theme } from '@leafygreen-ui/lib';

import { MenuProps } from '../Menu/Menu.types';
import { MenuContext } from '../MenuContext';
import { Size } from '../types';

import MenuItem from './MenuItem';

export default {
  title: 'Components/Menu/MenuItem',
  component: MenuItem,
  parameters: {
    default: null,
    generate: {
      combineArgs: {
        darkMode: [false, true],
        description: [undefined, 'This is a description'],
        glyph: [undefined, <Icon glyph="Cloud" size="large" />],
        active: [false, true],
        size: Object.values(Size),
        disabled: [false, true],
        variant: ['default', 'destructive'],
      },
      args: {
        children: 'Menu Item',
      },
      decorator: (Instance, ctx) => {
        return (
          <MenuContext.Provider
            value={{
              darkMode: ctx?.args?.darkMode ?? false,
              theme: ctx?.args?.darkMode ? Theme.Dark : Theme.Light,
            }}
          >
            <Instance />
          </MenuContext.Provider>
        );
      },
    },
  },
} satisfies StoryMetaType<typeof MenuItem, Partial<MenuProps>>;

export const Generated = () => {};
