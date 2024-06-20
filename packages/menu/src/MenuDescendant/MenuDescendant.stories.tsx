/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import TextInput from '@leafygreen-ui/text-input';

import { Menu } from '../Menu';
import { MenuItem } from '../MenuItem';

import { MenuDescendant } from './MenuDescendant';

export default {
  title: 'Components/Menu/Menu Descendant',
  component: MenuDescendant,
  parameters: {
    default: null,
  },
  args: {
    darkMode: false,
  },
  argTypes: {
    darkMode: {
      control: 'boolean',
    },
  },
} satisfies StoryMetaType<typeof MenuDescendant>;

export const LiveExample = {
  render: () => {
    return (
      <Menu initialOpen trigger={<Button>Menu</Button>} renderDarkMenu={false}>
        <MenuDescendant>
          <TextInput aria-label="Test" placeholder="Input" />
        </MenuDescendant>
        <MenuItem>Apple</MenuItem>
      </Menu>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
} satisfies StoryObj<typeof MenuDescendant>;
