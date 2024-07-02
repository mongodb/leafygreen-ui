/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';

import { MenuProps } from '../Menu';
import { MenuItem, Variant } from '../MenuItem';
import { withMenuContext } from '../testUtils/withMenuContextDecorator.testutils';

import { SubMenu } from '.';

export default {
  title: 'Components/Menu/SubMenu',
  component: SubMenu,
  args: {
    active: false,
    title: 'Sub menu',
    description: 'This is a description',
  },
  parameters: {
    default: null,
    controls: {
      exclude: ['open', 'setOpen'],
    },
    generate: {
      storyNames: [
        'Default',
        'Active',
        'Focused',
        'Destructive',
        'Disabled',
        'DarkInLightMode',
      ],
      combineArgs: {
        darkMode: [false, true],
      },
      decorator: withMenuContext(),
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
  parameters: {
    chromatic: {
      disableSnapshots: true,
    },
  },
} satisfies StoryObj<typeof SubMenu>;

export const Default = {
  render: () => <></>,
  parameters: {
    generate: {
      combineArgs: {
        description: [undefined, 'This is a description'],
        glyph: [undefined, <Icon glyph="Cloud" />],
        disabled: [false, true],
      },
    },
  },
} satisfies StoryObj<typeof MenuItem>;

export const Active = {
  render: () => <></>,
  args: {
    active: true,
  },
  parameters: {
    generate: {
      combineArgs: {
        description: [undefined, 'This is a description'],
        glyph: [undefined, <Icon glyph="Cloud" />],
        disabled: [false, true],
      },
    },
  },
} satisfies StoryObj<typeof MenuItem>;

export const Focused = {
  render: () => <></>,
  args: {
    highlighted: true,
    disabled: false,
  },
  parameters: {
    generate: {
      combineArgs: {
        description: [undefined, 'This is a description'],
        glyph: [undefined, <Icon glyph="Cloud" />],
        disabled: [false, true],
      },
    },
    chromatic: {
      delay: 100,
    },
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
        description: [undefined, 'This is a description'],
        glyph: [undefined, <Icon glyph="Cloud" />],
        disabled: [false, true],
      },
    },
  },
} satisfies StoryObj<typeof MenuItem>;
