/* eslint-disable react/jsx-key */
/* eslint-disable react/display-name */
import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';

import Icon from '@leafygreen-ui/icon';
import { Theme } from '@leafygreen-ui/lib';

import { MenuContext } from '../MenuContext';
import { Size } from '../types';

import MenuItem from './MenuItem';

const meta: StoryMetaType<typeof MenuItem> = {
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
              darkMode: ctx?.args.darkMode,
              theme: ctx?.args.darkMode ? Theme.Dark : Theme.Light,
            }}
          >
            <Instance />
          </MenuContext.Provider>
        );
      },
    },
  },
};
export default meta;

export const Generated = () => {};
