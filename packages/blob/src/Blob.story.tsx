import React from 'react';
import { Meta, Story } from '@storybook/react';
import Blob from '.';
import { BlobProps } from './types';

export default {
  title: 'Components/Blob',
  component: Blob,
  parameters: {
    controls: {
      exclude: ['children', 'className'],
    },
  },
} as Meta<Blob>;

const Template: Story<BlobProps> = ({ shape }: BlobProps) => (
  <Blob shape={shape} />
);

export const Basic = Template.bind({});
Basic.args = {
  shape: [
    ['_', '_', 'o', 'o'],
    ['o', 'o', '_', '_'],
    ['o', 'o', '_', 'o'],
    ['_', 'o', 'o', 'o'],
  ],
};

export const WithLarge = Template.bind({});
WithLarge.args = {
  shape: [
    ['O', 'O', '_', '_'],
    ['O', 'O', 'O', 'O'],
    ['_', '_', 'O', 'O'],
    ['_', '_', '_', 'o'],
  ],
};
