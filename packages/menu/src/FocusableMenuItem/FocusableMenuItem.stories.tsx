/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import TextInput from '@leafygreen-ui/text-input';

import { Menu } from '../Menu';
import { MenuItem } from '../MenuItem';

import { FocusableMenuItem } from './FocusableMenuItem';

export default {
  title: 'Components/Menu/FocusableMenuItem',
  component: FocusableMenuItem,
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
} satisfies StoryMetaType<typeof FocusableMenuItem>;

export const LiveExample = {
  render: () => {
    return (
      <Menu initialOpen trigger={<Button>Menu</Button>} renderDarkMenu={false}>
        <FocusableMenuItem>
          <TextInput aria-label="Test" placeholder="Input" />
        </FocusableMenuItem>
        <MenuItem>Apple</MenuItem>
      </Menu>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
} satisfies StoryObj<typeof FocusableMenuItem>;
