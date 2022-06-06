import React from 'react';
import { css } from '@leafygreen-ui/emotion';
import { H2, Body, Link } from '@leafygreen-ui/typography';
import InlineDefinition from '.';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'Packages/InlineDefinition',
  component: InlineDefinition,
  args: {
    definition:
      'Sharding is a method for horizontally scaling across multiple replica sets by breaking up large datasets (e.g. partitioning) into smaller parts. Sharding is native to MongoDB.',
  },
  argTypes: {
    definition: { control: 'text' },
    children: { control: 'text' },
  },
};

const Template: ComponentStory<typeof InlineDefinition> = args => (
  <InlineDefinition {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  children: 'Shard',
};

export const Demo: ComponentStory<typeof InlineDefinition> = args => (
  <div
    className={css`
      display: flex;
      flex-direction: column;
    `}
  >
    <H2>
      <InlineDefinition {...args}>Shard</InlineDefinition> your cluster
    </H2>

    <Body>
      Base hourly rate is for a MongoDB{' '}
      <InlineDefinition {...args}>replica set</InlineDefinition> with 3 data
      bearing servers.
    </Body>
    <Body>
      MongoDB shards data at the{' '}
      <InlineDefinition {...args}>
        <Link
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
