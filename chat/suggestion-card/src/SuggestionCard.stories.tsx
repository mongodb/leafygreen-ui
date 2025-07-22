import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { Status, SuggestionCard, SuggestionCardProps } from '.';

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
      'Cluster Tier': 'M200 ($14.59/hour)',
      'Provider': 'AWS / N. Virginia (us-east-1)',
      'Storage': '1500 GB',
      'RAM': '256 GB',
      'vCPUs': '64 vCPUs',
    },
    appliedParameters: {
      'Cloud Provider & Region': 'AWS / N. Virginia (us-east-1)',
      'Cluster Tier': 'M200',
    },
    failedParameters: {
      'Cloud Provider & Region': 'AWS / N. Virginia (us-east-1)',
      'Cluster Tier': 'M200',
    },
    onClickApply: () => {},
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
    appliedParameters: {
      control: 'object',
    },
    failedParameters: {
      control: 'object',
    },
    onClickApply: {
      action: 'onClickApply',
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
