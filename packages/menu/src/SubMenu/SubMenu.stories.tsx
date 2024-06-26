/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';

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
    return (
      <div
        className={css`
          width: 256px;
          outline: 1px dashed gray;
        `}
      >
        <SubMenu {...(args as any)} initialOpen>
          <MenuItem>Apple</MenuItem>
          <MenuItem>Banana</MenuItem>
          <MenuItem disabled>Carrot</MenuItem>
        </SubMenu>
        <SubMenu {...(args as any)} initialOpen glyph={<Icon glyph="Cloud" />}>
          <MenuItem>Jalapeño</MenuItem>
          <MenuItem active>Habanero</MenuItem>
          <MenuItem glyph={<Icon glyph="Beaker" />}>Ghost</MenuItem>
        </SubMenu>
      </div>
    );
  },
  args: {
    title: 'Sub menu',
    description: 'This is a description',
  },
  parameters: {
    chromatic: {
      disableSnapshots: true,
    },
  },
} satisfies StoryObj<typeof SubMenu>;
