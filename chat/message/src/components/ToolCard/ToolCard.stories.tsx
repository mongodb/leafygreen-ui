import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';

import DatabaseIcon from '@leafygreen-ui/icon/dist/Database';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { State, ToolCard, ToolCardProps } from './index';

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

const meta: StoryMetaType<typeof ToolCard> = {
  title: 'Composition/Chat/Message/ToolCard',
  component: ToolCard,
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

const renderToolCardChildren = () => (
  <>
    <ToolCard.ExpandableContent>
      {`#### ARGUMENTS

\`\`\`javascript
{
  foo: 'bar',
  baz: 'qux',
}
\`\`\``}
    </ToolCard.ExpandableContent>
    <ToolCard.Actions
      onClickCancel={() => {
        // eslint-disable-next-line no-console
        console.log('Cancel clicked');
      }}
      onClickRun={() => {
        // eslint-disable-next-line no-console
        console.log('Run clicked');
      }}
    />
  </>
);

const Template: StoryFn<ToolCardProps> = props => (
  <LeafyGreenProvider darkMode={props.darkMode}>
    <ToolCard {...props}>{renderToolCardChildren()}</ToolCard>
  </LeafyGreenProvider>
);

export const LiveExample: StoryObj<typeof ToolCard> = {
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

export const Canceled: StoryObj<typeof ToolCard> = {
  render: Template,
  args: {
    state: State.Canceled,
    title: titles[State.Canceled],
    chips,
    children: renderToolCardChildren(),
  },
};

export const Error: StoryObj<typeof ToolCard> = {
  render: Template,
  args: {
    state: State.Error,
    title: titles[State.Error],
    chips,
    children: renderToolCardChildren(),
  },
};

export const Idle: StoryObj<typeof ToolCard> = {
  render: Template,
  args: {
    state: State.Idle,
    title: titles[State.Idle],
    chips,
    children: renderToolCardChildren(),
  },
};

export const Running: StoryObj<typeof ToolCard> = {
  render: Template,
  args: {
    state: State.Running,
    title: titles[State.Running],
    chips,
    children: renderToolCardChildren(),
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Success: StoryObj<typeof ToolCard> = {
  render: Template,
  args: {
    state: State.Success,
    title: titles[State.Success],
    chips,
    children: renderToolCardChildren(),
  },
};
