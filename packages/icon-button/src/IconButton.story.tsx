import React from 'react';

import Icon from '@leafygreen-ui/icon/';
import {
  DarkModeProps,
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
  StoryType,
} from '@leafygreen-ui/lib';

import { Size } from './types';
import IconButton, { AccessibleIconButtonProps } from '.';

const meta: StoryMetaType<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams, 'children'],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        active: [false, true],
        size: Object.values(Size),
        disabled: [false, true],
      },
    },
  },
  args: {
    href: undefined,
    children: <Icon glyph="Cloud" />,
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    href: { control: 'string' },
    active: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

export const LiveExample: StoryType<
  typeof IconButton,
  AccessibleIconButtonProps & DarkModeProps
> = ({ darkMode, ...args }: AccessibleIconButtonProps & DarkModeProps) => (
  <IconButton darkMode={darkMode} {...args} />
);
LiveExample.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const Generated = () => {};
