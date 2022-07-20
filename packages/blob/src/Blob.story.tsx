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
    [' ', ' ', 'o', 'o'],
    ['o', 'o', ' ', ' '],
    ['o', 'o', ' ', 'o'],
    [' ', 'o', 'o', 'o'],
  ],
};

export const WithLarge = Template.bind({});
WithLarge.args = {
  shape: [
    ['O', 'O', ' ', ' '],
    ['O', 'O', ' ', ' '],
    [' ', ' ', 'O', 'O'],
    [' ', ' ', 'O', 'O'],
  ],
};
