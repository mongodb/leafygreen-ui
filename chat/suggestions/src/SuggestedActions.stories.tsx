import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { State, SuggestedActions, SuggestedActionsProps } from '.';

const meta: StoryMetaType<typeof SuggestedActions> = {
  title: 'Chat/SuggestedActions',
  component: SuggestedActions,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        state: Object.values(State),
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
    state: State.Unset,
    configurationParameters: [
      {
        key: 'Cluster Tier',
        value: 'M200 ($14.59/hour)',
        state: State.Success,
      },
      {
        key: 'Provider',
        value: 'AWS / N. Virginia (us-east-1)',
        state: State.Success,
      },
      { key: 'Storage', value: '1500 GB' },
      { key: 'RAM', value: '256 GB', state: State.Error },
      { key: 'vCPUs', value: '64 vCPUs', state: State.Error },
    ],
    onClickApply: () => {},
    darkMode: false,
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    state: {
      options: Object.values(State),
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
