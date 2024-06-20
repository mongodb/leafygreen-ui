import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import Icon, { glyphs } from '@leafygreen-ui/icon';

import { MenuItem } from '../MenuItem';
import { SubMenu } from '../SubMenu';

import MenuGroup from './MenuGroup';

export default {
  title: 'Components/Menu/MenuGroup',
  component: MenuGroup,
  parameters: {
    default: null,
  },
  args: {
    title: 'Group',
    glyph: 'AllProducts',
  },
  argTypes: {
    glyph: {
      control: 'select',
      options: [undefined, ...Object.keys(glyphs)],
    },
  },
} satisfies StoryMetaType<typeof MenuGroup>;

export const LiveExample = {
  render: ({ glyph, ...args }) => (
    <div
      className={css`
        width: 256px;
        outline: 1px dashed gray;
      `}
    >
      <MenuGroup
        {...args}
        glyph={
          glyph && <Icon glyph={glyph as unknown as keyof typeof glyphs} />
        }
      >
        <MenuItem>Apple</MenuItem>
        <MenuItem>Banana</MenuItem>
        <MenuItem>Carrot</MenuItem>
        <SubMenu title="Peppers">
          <MenuItem>Jalapeño</MenuItem>
          <MenuItem>Habanero</MenuItem>
          <MenuItem>Ghost</MenuItem>
        </SubMenu>
        <SubMenu title="Sweets" glyph={<Icon glyph="Warning" />}>
          <MenuItem>Jellybeans</MenuItem>
          <MenuItem>Chocolate</MenuItem>
          <MenuItem>Cotton Candy</MenuItem>
        </SubMenu>
      </MenuGroup>
    </div>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
} satisfies StoryObj<typeof MenuGroup>;
