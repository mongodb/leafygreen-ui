import React from 'react';
import { Meta } from '@storybook/react';
import { Pipeline, Stage } from '.';
import { PipelineProps } from './Pipeline';

export default {
  title: 'Components/Pipeline',
  component: Pipeline,
  args: {
    stages: ['$match', '$group', '$project', '$addFields', '$limit'].join(','),
  },
  argTypes: {
    className: {
      type: 'string',
    },
    children: {
      control: false,
    },
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
