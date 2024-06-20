import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';

import { MenuItem } from '../MenuItem';

import MenuGroup from './MenuGroup';

export default {
  title: 'Components/Menu/MenuGroup',
  component: MenuGroup,
  parameters: {
    default: null,
  },
} satisfies StoryMetaType<typeof MenuGroup>;

export const LiveExample = {
  render: () => (
    <ul
      className={css`
        width: 256px;
      `}
    >
      <MenuGroup>
        <MenuItem>Item</MenuItem>
      </MenuGroup>
    </ul>
  ),
} satisfies StoryObj<typeof MenuGroup>;
