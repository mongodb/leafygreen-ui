import React from 'react';
import { ComponentStory } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import { storybookArgTypes } from '@leafygreen-ui/lib';
import { Body, H2, Link } from '@leafygreen-ui/typography';

import InlineDefinition from '.';

export default {
  title: 'Components/InlineDefinition',
  component: InlineDefinition,
  args: {
    darkMode: false,
    definition:
      'Sharding is a method for horizontally scaling across multiple replica sets by breaking up large datasets (e.g. partitioning) into smaller parts. Sharding is native to MongoDB.',
    spacing: 9,
  },
  argTypes: {
    definition: { control: 'text' },
    children: { control: 'text' },
    darkMode: storybookArgTypes.darkMode,
  },
  parameters: {
    controls: {
      exclude: ['trigger', 'open'],
    },
  },
};

const Template: ComponentStory<typeof InlineDefinition> = ({
  // eslint-disable-next-line react/prop-types
  darkMode,
  ...args
}) => (
  <Body darkMode={darkMode}>
    <InlineDefinition darkMode={darkMode} {...args} />
  </Body>
);

export const Basic = Template.bind({});
Basic.args = {
  children: 'Shard',
};

export const Demo: ComponentStory<typeof InlineDefinition> = ({
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
    <H2 darkMode={darkMode}>
      <InlineDefinition darkMode={darkMode} {...args}>
        Shard
      </InlineDefinition>{' '}
      your cluster
    </H2>

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
