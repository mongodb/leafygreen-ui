import React from 'react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import SuggestionCard, { Status, SuggestionCardProps } from '.';

export default {
  title: 'Chat/SuggestionCard',
  component: SuggestionCard,
  args: {
    status: Status.Unset,
    suggestedConfigurationParameters: {
      clusterTier: 'M200',
      price: '$14.59/hour',
      cloudProvider: 'AWS / N. Virginia (us-east-1)',
      storage: '1500 GB',
      ram: '256 GB',
      vCPUs: '64 vCPUs',
    },
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    status: {
      control: 'select',
      options: Object.values(Status),
    },
    suggestedConfigurationParameters: {
      control: 'object',
    },
  },
};

export const LiveExample: StoryFn<SuggestionCardProps> = props => (
  <SuggestionCard {...props} />
);

export const Generated = () => {};
