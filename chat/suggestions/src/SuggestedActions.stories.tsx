import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { Status, SuggestedActions, SuggestedActionsProps } from '.';

const meta: StoryMetaType<typeof SuggestedActions> = {
  title: 'Chat/SuggestedActions',
  component: SuggestedActions,
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
    status: Status.Apply,
    configurationParameters: {
      apply: {
        'Cluster Tier': 'M200 ($14.59/hour)',
        Provider: 'AWS / N. Virginia (us-east-1)',
        Storage: '1500 GB',
        RAM: '256 GB',
        vCPUs: '64 vCPUs',
      },
      success: {
        'Cloud Provider & Region': 'AWS / N. Virginia (us-east-1)',
        'Cluster Tier': 'M200',
      },
      error: {
        'Cloud Provider & Region': 'AWS / N. Virginia (us-east-1)',
        'Cluster Tier': 'M200',
      },
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
    configurationParameters: {
      control: 'object',
    },
    onClickApply: {
      action: 'onClickApply',
    },
  },
};

export default meta;

export const LiveExample: StoryFn<SuggestedActionsProps> = (
  props: SuggestedActionsProps,
) => <SuggestedActions {...props} />;
LiveExample.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Generated = () => {};
