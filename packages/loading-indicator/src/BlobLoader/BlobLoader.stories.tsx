import React from 'react';
import { StoryFn } from '@storybook/react';

import { StoryMetaType } from '@leafygreen-ui/lib';

import BlobLoader from './BlobLoader';
import { BlobLoaderProps } from '.';

const meta: StoryMetaType<typeof BlobLoader> = {
  title: 'Components/LoadingIndicator/BlobLoader',
  component: BlobLoader,
  argTypes: {
    description: { control: 'text' },
  },
  parameters: {
    default: 'Default',
  },
};

export default meta;

const Template: StoryFn<BlobLoaderProps> = props => <BlobLoader {...props} />;

export const Default = Template.bind({});

export const WithDescription = Template.bind({});
WithDescription.args = {
  description: 'Loading...',
};
