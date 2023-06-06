import React from 'react';
import { StoryFn } from '@storybook/react';

import { StoryMetaType } from '@leafygreen-ui/lib';

import PageLoader from './PageLoader';

const meta: StoryMetaType<typeof PageLoader> = {
  title: 'Components/LoadingIndicator/PageLoader',
  component: PageLoader,
  argTypes: {
    description: { control: 'text' },
  },
  parameters: {
    default: 'Default',
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export default meta;

const Template: StoryFn<typeof PageLoader> = props => <PageLoader {...props} />;

export const Default = Template.bind({});

export const WithDescription = Template.bind({});
WithDescription.args = {
  description: 'Loading...',
};
