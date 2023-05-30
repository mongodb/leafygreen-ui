import React from 'react';
import { ComponentStory } from '@storybook/react';

import { StoryMeta } from '@leafygreen-ui/lib';

import BlobLoader from './BlobLoader';

export default StoryMeta({
  title: 'Components/LoadingIndicator/BlobLoader',
  component: BlobLoader,
  argTypes: {
    description: { control: 'text' },
  },
  parameters: {
    default: 'Default',
  },
});

const Template: ComponentStory<typeof BlobLoader> = props => (
  <BlobLoader {...props} />
);

export const Default = Template.bind({});

export const WithDescription = Template.bind({});
WithDescription.args = {
  description: 'Loading...',
};
