import React from 'react';
import { ComponentStory } from '@storybook/react';

import { StoryMeta } from '@leafygreen-ui/lib';

import Spinner from './Spinner';
import { DisplayOption } from './Spinner.types';

export default StoryMeta({
  title: 'Components/LoadingIndicator/Spinner',
  component: Spinner,
  args: {
    displayOption: 'default',
  },
  argTypes: {
    description: { control: 'text' },
    sizeOverride: { control: 'number' },
    displayOption: { control: 'select', options: Object.values(DisplayOption) },
  },
  parameters: {
    default: 'Default',
  },
});

const Template: ComponentStory<typeof Spinner> = props => (
  <Spinner {...props} />
);

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
  sizeOverride: 100,
};
