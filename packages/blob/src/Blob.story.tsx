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
    ['o', '_', 'o', 'o'],
    ['_', 'o', '_', '_'],
    ['_', 'o', '_', '_'],
    ['o', '_', 'o', 'o'],
  ],
};
