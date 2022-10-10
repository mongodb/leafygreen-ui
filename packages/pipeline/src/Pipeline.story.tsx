import React from 'react';
import { Meta } from '@storybook/react';
import Pipeline from './Pipeline';
import Stage from './Stage';
import { PipelineProps, Size } from './types';
import { storybookArgTypes } from '@leafygreen-ui/lib';

export default {
  title: 'Components/Pipeline',
  component: Pipeline,
  args: {
    stages: ['$match', '$group', '$project', '$addFields', '$limit'].join(','),
    darkMode: false,
    size: Size.Normal
  },
  argTypes: {
    className: {
      type: 'string',
    },
    children: {
      control: false,
    },
    darkMode: storybookArgTypes.darkMode,
    stages: {
      description:
        '[STORYBOOK ONLY]\n\nThis prop is used to generate DOM elements to render children. It is not defined in the component.',
    },
  },
} as Meta<typeof Pipeline>;

export const Basic = ({
  stages,
  ...args
}: PipelineProps & { stages: string }) => {
  return (
    <Pipeline {...args}>
      {stages.split(',').map((stage, index) => (
        <Stage key={`${stage}-${index}`}>{stage}</Stage>
      ))}
    </Pipeline>
  );
};
