import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn, StoryObj } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import { Body, H3, Link } from '@leafygreen-ui/typography';

import InlineDefinition, { InlineDefinitionProps } from '.';

const meta: StoryMetaType<typeof InlineDefinition> = {
  title: 'Components/Typography/InlineDefinition',
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
      decorator: Instance => {
        return (
          <div
            className={css`
              width: 50vw;
              height: 200px;
              display: flex;
              justify-content: center;
              align-items: flex-start;
            `}
          >
            <Instance />
          </div>
        );
      },
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

export const LiveExample: StoryFn<InlineDefinitionProps> = ({
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

export const LightMode: StoryObj<typeof InlineDefinition> = {
  args: {
    open: true,
    darkMode: false,
    definition:
      'Sharding is a method for horizontally scaling across multiple replica sets by breaking up large datasets (e.g. partitioning) into smaller parts. Sharding is native to MongoDB.',
    children: 'Shard',
  },
  render: ({ darkMode, ...args }) => (
    <Body darkMode={darkMode}>
      <InlineDefinition darkMode={darkMode} {...args} />
    </Body>
  ),
  parameters: {
    chromatic: {
      delay: 100,
    },
  },
};

export const DarkMode: StoryObj<typeof InlineDefinition> = {
  args: {
    ...LightMode.args,
    darkMode: true,
  },
  decorators: [
    StoryFn => (
      <div
        className={css`
          min-height: 100px;
        `}
      >
        <StoryFn />
      </div>
    ),
  ],
  render: LightMode.render,
  parameters: {
    chromatic: {
      delay: 100,
    },
  },
};
