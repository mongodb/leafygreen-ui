import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';

import DatabaseIcon from '@leafygreen-ui/icon/dist/Database';
import ReturnIcon from '@leafygreen-ui/icon/dist/Return';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { ActionCard, ActionCardProps, State } from './index';

const chips = [
  { label: 'docdb-elastic.amazonaws.com:27017', glyph: <DatabaseIcon /> },
];
const titles = {
  [State.Canceled]: 'Canceled list-databases',
  [State.Error]: 'Failed running list-databases',
  [State.Idle]: 'Run list-databases?',
  [State.Running]: 'Running list-databases...',
  [State.Success]: 'Ran list-databases',
} as const;

const meta: StoryMetaType<typeof ActionCard> = {
  title: 'Composition/Chat/Message/ActionCard',
  component: ActionCard,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams],
    },
    generate: {
      storyNames: ['Canceled', 'Error', 'Idle', 'Running', 'Success'],
      combineArgs: {
        darkMode: [false, true],
        initialIsExpanded: [false, true],
        showExpandButton: [false, true],
      },
      excludeCombinations: [
        {
          initialIsExpanded: true,
          showExpandButton: false,
        },
      ],
    },
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    state: {
      control: 'select',
      options: Object.values(State),
    },
    showExpandButton: {
      control: 'boolean',
    },
    initialIsExpanded: {
      control: 'boolean',
    },
    title: {
      control: 'text',
    },
    chips: {
      control: 'object',
    },
  },
  args: {
    title: 'Run list-databases?',
    chips,
    state: State.Idle,
    showExpandButton: true,
    initialIsExpanded: false,
  },
};

export default meta;

const renderActionCardChildren = () => (
  <>
    <ActionCard.ExpandableContent>
      {`#### ARGUMENTS

\`\`\`json
{
  "database": "sample_mflix",
  "collection": "embedded_movies",
  "pipeline": [
    {
      "$search": {
        "index": "movie_search_index",
        "text": {
          "query": "science fiction",
          "path": "plot"
        }
      }
    }
  ]
}
\`\`\``}
    </ActionCard.ExpandableContent>
    <ActionCard.Button
      onClick={() => {
        // eslint-disable-next-line no-console
        console.log('Cancel clicked');
      }}
    >
      Cancel
    </ActionCard.Button>
    <ActionCard.Button
      onClick={() => {
        // eslint-disable-next-line no-console
        console.log('Run clicked');
      }}
      rightGlyph={<ReturnIcon />}
      variant="primary"
    >
      Run
    </ActionCard.Button>
  </>
);

const Template: StoryFn<ActionCardProps> = props => (
  <LeafyGreenProvider darkMode={props.darkMode}>
    <ActionCard {...props}>{renderActionCardChildren()}</ActionCard>
  </LeafyGreenProvider>
);

export const LiveExample: StoryObj<typeof ActionCard> = {
  render: Template,
  args: {
    title: titles[State.Idle],
    chips,
    state: State.Idle,
    showExpandButton: true,
    initialIsExpanded: false,
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Canceled: StoryObj<typeof ActionCard> = {
  render: Template,
  args: {
    state: State.Canceled,
    title: titles[State.Canceled],
    chips,
    children: renderActionCardChildren(),
  },
};

export const Error: StoryObj<typeof ActionCard> = {
  render: Template,
  args: {
    state: State.Error,
    title: titles[State.Error],
    chips,
    children: renderActionCardChildren(),
  },
};

export const Idle: StoryObj<typeof ActionCard> = {
  render: Template,
  args: {
    state: State.Idle,
    title: titles[State.Idle],
    chips,
    children: renderActionCardChildren(),
  },
};

export const Running: StoryObj<typeof ActionCard> = {
  render: Template,
  args: {
    state: State.Running,
    title: titles[State.Running],
    chips,
    children: renderActionCardChildren(),
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Success: StoryObj<typeof ActionCard> = {
  render: Template,
  args: {
    state: State.Success,
    title: titles[State.Success],
    chips,
    children: renderActionCardChildren(),
  },
};
