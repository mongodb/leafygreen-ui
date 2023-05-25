import React from 'react';
import { StoryFn } from '@storybook/react';

import CloudIcon from '@leafygreen-ui/icon/dist/Cloud';
import {
  DarkModeProps,
  storybookArgTypes,
  StoryMetaType,
} from '@leafygreen-ui/lib';

import { Size } from './types';
import IconButton, { AccessibleIconButtonProps } from '.';

const meta: StoryMetaType<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    default: 'LiveExample',
    generate: {
      props: {
        darkMode: [false, true],
        disabled: [false, true],
        active: [false, true],
        size: Object.values(Size),
      },
    },
  },
  args: {
    href: undefined,
    children: <CloudIcon />,
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    href: { control: 'string' },
    active: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

export const LiveExample: StoryFn<
  AccessibleIconButtonProps & DarkModeProps
> = ({
  // eslint-disable-next-line react/prop-types
  darkMode,
  ...args
}: AccessibleIconButtonProps & DarkModeProps) => (
  <IconButton darkMode={darkMode} {...args} />
);

export const Generated = () => {};
