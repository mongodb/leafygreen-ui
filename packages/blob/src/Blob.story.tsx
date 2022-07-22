import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import Blob from '.';
import { blobCode, BlobProps } from './types';
import { cloneDeep } from 'lodash';

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
    [' ', ' ', ' ', ' '],
    [' ', 'o', 'o', ' '],
    [' ', 'o', 'o', ' '],
    [' ', ' ', ' ', 'o'],
  ],
};

export const WithLarge = Template.bind({});
WithLarge.args = {
  shape: [
    ['O', 'O', ' ', ' '],
    ['O', 'O', 'O', 'O'],
    [' ', ' ', 'O', 'O'],
    [' ', ' ', ' ', ' '],
  ],
};

export const Interactive = () => {
  const [shape, setShape] = useState<blobCode>([
    ['o', ' ', ' ', ' '],
    [' ', 'o', ' ', ' '],
    [' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' '],
  ]);

  // console.log(shape);

  return (
    <Blob
      shape={shape}
      mode="interactive"
      onGridCircleClick={([r, c]) => {
        const current = shape[r][c];
        const next = current === ' ' ? 'o' : ' ';
        const newShape = cloneDeep(shape);
        newShape[r][c] = next;
        setShape(newShape);
      }}
    />
  );
};
