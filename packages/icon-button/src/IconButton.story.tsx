import React from 'react';
import { StoryFn } from '@storybook/react';

import CloudIcon from '@leafygreen-ui/icon/dist/Cloud';
import {
  DarkModeProps,
  storybookArgTypes,
  storybookExcludedControlParams as defaultExclude,
  StoryMetaType,
} from '@leafygreen-ui/lib';

import IconButton, { AccessibleIconButtonProps } from '.';

const meta: StoryMetaType<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    default: 'Basic',
    controls: {
      exclude: [...defaultExclude, 'children'],
    },
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    href: { control: 'string' },
    active: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

/// @ts-expect-error
const Template: StoryFn<AccessibleIconButtonProps & DarkModeProps> = ({
  // eslint-disable-next-line react/prop-types
  darkMode,
  ...args
}) => (
  <IconButton darkMode={darkMode} {...(args as AccessibleIconButtonProps)}>
    <CloudIcon />
  </IconButton>
);

export const Basic = Template.bind({});

export const Link = Template.bind({});
Link.args = {
  href: 'https://mongodb.design',
};
