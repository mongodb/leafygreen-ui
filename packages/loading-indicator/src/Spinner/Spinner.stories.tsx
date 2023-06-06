import React from 'react';
import { StoryFn } from '@storybook/react';

import { StoryMetaType } from '@leafygreen-ui/lib';

import Spinner from './Spinner';
import { DisplayOption } from './Spinner.types';

const meta: StoryMetaType<typeof Spinner> = {
  title: 'Components/LoadingIndicator/Spinner',
  component: Spinner,
  argTypes: {
    description: { control: 'text' },
    sizeOverride: { control: 'number' },
    displayOption: { control: 'select', options: Object.values(DisplayOption) },
  },
  parameters: {
    default: 'Default',
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export default meta;

const Template: StoryFn<typeof Spinner> = props => <Spinner {...props} />;

export const Default = Template.bind({});

export const WithDescription = Template.bind({});
WithDescription.args = {
  description: 'Loading...',
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  displayOption: 'default-horizontal',
  description: 'Loading...',
};

export const SizeOverride = Template.bind({});
SizeOverride.args = {
  sizeOverride: 10,
};

export const ColorOverride = Template.bind({});
ColorOverride.args = {
  colorOverride: 'purple',
};
