import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import SuggestionCard, { Status, SuggestionCardProps } from '.';

const meta: StoryMetaType<typeof SuggestionCard> = {
  title: 'Chat/SuggestionCard',
  component: SuggestionCard,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        status: Object.values(Status),
      },
    },
    controls: {
      exclude: [...storybookExcludedControlParams],
    },
    docs: {
      description: {
        component:
          'A card that displays a suggestion for a MongoDB cluster configuration and allows the user to apply the suggestion.',
      },
    },
  },
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
    handleApply: () => {},
    darkMode: false,
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    status: {
      options: Object.values(Status),
      control: { type: 'select' },
    },
    suggestedConfigurationParameters: {
      control: 'object',
    },
    handleApply: {
      action: 'handleApply',
    },
  },
};

export default meta;

export const LiveExample: StoryFn<SuggestionCardProps> = props => (
  <SuggestionCard {...props} />
);
LiveExample.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Generated = () => {};
