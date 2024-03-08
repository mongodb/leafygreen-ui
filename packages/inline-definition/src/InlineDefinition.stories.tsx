import React from 'react';
import { StoryFn } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@leafygreen-ui/lib';
import { Body, H3, Link } from '@leafygreen-ui/typography';

import InlineDefinition, { InlineDefinitionProps } from '.';

const meta: StoryMetaType<typeof InlineDefinition> = {
  title: 'Components/InlineDefinition',
  component: InlineDefinition,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams, 'trigger', 'open'],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
      },
      args: { open: true },
    },
  },
  args: {
    darkMode: false,
    definition:
      'Sharding is a method for horizontally scaling across multiple replica sets by breaking up large datasets (e.g. partitioning) into smaller parts. Sharding is native to MongoDB.',
    spacing: 9,
    children: 'Shard',
  },
  argTypes: {
    definition: { control: 'text' },
    children: { control: 'text' },
    darkMode: storybookArgTypes.darkMode,
  },
};

export default meta;

const Template: StoryFn<InlineDefinitionProps> = ({
  // eslint-disable-next-line react/prop-types
  darkMode,
  ...args
}) => (
  <Body darkMode={darkMode}>
    <InlineDefinition darkMode={darkMode} {...args} />
  </Body>
);

export const Basic = Template.bind({});

export const LiveExample: StoryFn<InlineDefinitionProps> = ({
  // eslint-disable-next-line react/prop-types
  darkMode,
  ...args
}) => (
  <div
    className={css`
      display: flex;
      flex-direction: column;
    `}
  >
    <H3 darkMode={darkMode}>
      <InlineDefinition darkMode={darkMode} {...args}>
        Shard
      </InlineDefinition>{' '}
      your cluster
    </H3>

    <Body darkMode={darkMode}>
      Base hourly rate is for a MongoDB{' '}
      <InlineDefinition darkMode={darkMode} {...args}>
        replica set
      </InlineDefinition>{' '}
      with 3 data bearing servers.
    </Body>
    <Body darkMode={darkMode}>
      MongoDB shards data at the{' '}
      <InlineDefinition darkMode={darkMode} {...args}>
        <Link
          darkMode={darkMode}
          href={
            'https://docs.mongodb.com/manual/core/sharding-shard-a-collection'
          }
        >
          collections
        </Link>
      </InlineDefinition>{' '}
      level, distributing the collection data across the shards in the cluster.
    </Body>
  </div>
);
LiveExample.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const Generated = () => {};
