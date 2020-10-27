import React from 'react';
import LiveExample, { KnobsConfigInterface } from '@leafygreen-ui/live-example';
import { Align, Justify } from '@leafygreen-ui/tooltip';
import { H2 } from '@leafygreen-ui/typography';
import InlineDefinition, { InlineDefinitionProps } from './InlineDefinition';

const shardDefinition =
  'Sharding is a method for horizontally scaling across multiple replica sets by breaking up large datasets (e.g. partitioning) into smaller parts. Sharding is native to MongoDB.';

const knobsConfig: KnobsConfigInterface<InlineDefinitionProps> = {
  definition: {
    type: 'text',
    default: shardDefinition,
    label: 'Definition',
  },
  children: {
    type: 'text',
    default: 'Shard',
    label: 'Children',
  },
  align: {
    type: 'select',
    options: Object.values(Align),
    default: 'top',
    label: 'Align',
  },
  justify: {
    type: 'select',
    options: Object.values(Justify),
    default: 'start',
    label: 'Justify',
  },
};

const InlineDefinitionLiveExample = () => {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => (
        <H2>
          <InlineDefinition {...props} /> your cluster
        </H2>
      )}
    </LiveExample>
  );
};

export { InlineDefinitionLiveExample };
