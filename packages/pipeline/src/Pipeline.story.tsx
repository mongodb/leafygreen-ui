import React from 'react';
import { Meta } from '@storybook/react';

import { storybookArgTypes } from '@leafygreen-ui/lib';

import Pipeline from './Pipeline';
import Stage from './Stage';
import { PipelineProps, Size } from './types';

export default {
  title: 'Components/Pipeline',
  component: Pipeline,
  args: {
    darkMode: false,
    size: Size.Normal,
    children: ['$match', '$group', '$project', '$addFields', '$limit'].map(
      (stage, index) => <Stage key={`${stage}-${index}`}>{stage}</Stage>,
    ),
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
  parameters: { controls: { exclude: ['children', 'className'] } },
} as Meta<typeof Pipeline>;

export const Basic = ({ ...args }: PipelineProps & { stages: string }) => {
  return <Pipeline {...args} />;
};
