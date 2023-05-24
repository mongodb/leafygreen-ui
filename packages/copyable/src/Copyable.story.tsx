import React from 'react';
import { StoryFn } from '@storybook/react';

import { storybookArgTypes, type StoryMetaType } from '@leafygreen-ui/lib';

import Copyable, { CopyableProps } from '.';

const meta: StoryMetaType<typeof Copyable> = {
  title: 'Components/Copyable',
  component: Copyable,
  parameters: {
    default: 'LiveExample',
    generate: {
      props: {
        darkMode: [false, true],
        copyable: [true, false],
        children: [
          'npm install @leafygreen-ui/copyable',
          'npm install --dev --global @leafygreen-ui/leafygreen-provider',
        ],
        label: [undefined, 'Label'],
        description: [undefined, 'Description'],
      },
      // @ts-ignore
      excludeCombinations: [['description', { label: undefined }]],
    },
  },
  args: {
    copyable: true,
    shouldTooltipUsePortal: true,
    darkMode: false,
    label: 'Label',
    description: 'Description',
    children: 'npm install @leafygreen-ui/copyable',
  },
  argTypes: {
    copyable: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    shouldTooltipUsePortal: { control: 'boolean' },
    children: storybookArgTypes.children,
    darkMode: storybookArgTypes.darkMode,
  },
};

export default meta;

export const LiveExample: StoryFn<CopyableProps> = args => (
  <Copyable {...args} />
);

export const Generated = () => {};
