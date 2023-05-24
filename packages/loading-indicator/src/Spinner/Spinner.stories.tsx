import React from 'react';
import { ComponentStory } from '@storybook/react';

import { StoryMeta } from '@leafygreen-ui/lib';

import Spinner from './Spinner';
import { Variant } from './Spinner.types';

export default StoryMeta({
  title: 'Components/LoadingIndicator/Spinner',
  component: Spinner,
  args: {
    variant: 'default',
  },
  argTypes: {
    description: { control: 'text' },
    sizeOverride: { control: 'number' },
    variant: { control: 'select', options: Object.values(Variant) },
  },
  parameters: {
    default: 'Default',
    controls: {
      exclude: ['baseFontSize'],
    },
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
  variant: 'horizontal',
};

export const SizeOverride = Template.bind({});
SizeOverride.args = {
  sizeOverride: 100,
};
