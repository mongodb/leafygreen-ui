import React from 'react';
import { ComponentStory } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import { storybookArgTypes } from '@leafygreen-ui/lib';

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
  <div>
    <InlineDefinition darkMode={darkMode} {...args} />
  </div>
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
    <h2>
      <InlineDefinition darkMode={darkMode} {...args}>
        Shard
      </InlineDefinition>{' '}
      your cluster
    </h2>

    <div>
      Base hourly rate is for a MongoDB{' '}
      <InlineDefinition darkMode={darkMode} {...args}>
        replica set
      </InlineDefinition>{' '}
      with 3 data bearing servers.
    </div>
    <div>
      MongoDB shards data at the{' '}
      <InlineDefinition darkMode={darkMode} {...args}>
        <a
          href={
            'https://docs.mongodb.com/manual/core/sharding-shard-a-collection'
          }
        >
          collections
        </a>
      </InlineDefinition>{' '}
      level, distributing the collection data across the shards in the cluster.
    </div>
  </div>
);
