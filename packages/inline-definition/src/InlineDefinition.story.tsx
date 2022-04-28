import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { css } from '@leafygreen-ui/emotion';
import { H2, Body, Link } from '@leafygreen-ui/typography';
import InlineDefinition from '.';

const shardDefinition =
  'Sharding is a method for horizontally scaling across multiple replica sets by breaking up large datasets (e.g. partitioning) into smaller parts. Sharding is native to MongoDB.';

const replicaSetDefintion =
  'An Atlas replica set is a group of MongoDB servers with the same data to provide redundancy and high availability. ';

const collectionDefinition =
  'A grouping of MongoDB documents. A collection exists within a single database. Collections do not enforce a schema.';

const collectionsLink =
  'https://docs.mongodb.com/manual/core/sharding-shard-a-collection';

storiesOf('Packages/InlineDefinition', module).add('Default', () => (
  <div
    className={css`
      display: flex;
      flex-direction: column;
    `}
  >
    <H2>
      <InlineDefinition definition={text('definition', shardDefinition)}>
        {text('children', 'Shard')}
      </InlineDefinition>{' '}
      your cluster
    </H2>

    <Body>
      Base hourly rate is for a MongoDB{' '}
      <InlineDefinition definition={replicaSetDefintion}>
        replica set
      </InlineDefinition>{' '}
      with 3 data bearing servers.
    </Body>
    <Body>
      MongoDB shards data at the{' '}
      <InlineDefinition definition={collectionDefinition}>
        <Link href={collectionsLink}>collections</Link>
      </InlineDefinition>{' '}
      level, distributing the collection data across the shards in the cluster.
    </Body>
  </div>
));
