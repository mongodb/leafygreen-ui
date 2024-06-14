/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';

import { MenuProps } from '../Menu';
import { MenuItem } from '../MenuItem';

import { SubMenu } from '.';

export default {
  title: 'Components/Menu/SubMenu',
  component: SubMenu,
  args: {
    active: false,
  },
  parameters: {
    default: null,
    controls: {
      exclude: ['open', 'setOpen'],
    },
  },
} satisfies StoryMetaType<typeof SubMenu, Partial<MenuProps>>;

export const LiveExample = {
  render: args => {
    const [open, setOpen] = useState(true);

    return (
      <div
        className={css`
          width: 256px;
          outline: 1px solid gray;
        `}
      >
        <SubMenu {...(args as any)} open={open} setOpen={setOpen}>
          <MenuItem>Apple</MenuItem>
          <MenuItem>Banana</MenuItem>
        </SubMenu>
      </div>
    );
  },
  args: {
    title: 'Sub menu',
    description: 'This is a description',
  },
} satisfies StoryObj<typeof SubMenu>;
