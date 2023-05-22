import React from 'react';
import { StoryFn } from '@storybook/react';

import {
  storybookArgTypes,
  storybookExcludedControlParams as defaultExclude,
  StoryMetaType,
} from '@leafygreen-ui/lib';

import Stage from './Stage';
import { Size } from './types';
import { Pipeline, PipelineProps } from '.';

const meta: StoryMetaType<typeof Pipeline> = {
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
  parameters: {
    default: 'Basic',
    controls: { exclude: [...defaultExclude, 'children'] },
  },
};
export default meta;

export const Basic: StoryFn<PipelineProps & { stages: string }> = ({
  ...args
}: PipelineProps & { stages: string }) => {
  return <Pipeline {...args} />;
};
