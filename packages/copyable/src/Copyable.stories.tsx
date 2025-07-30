import React from 'react';
import {
  storybookArgTypes,
  type StoryMetaType,
  StoryType,
} from '@lg-tools/storybook-utils';

import Copyable from '.';

const meta: StoryMetaType<typeof Copyable> = {
  title: 'Components/Actions/Copyable',
  component: Copyable,
  parameters: {
    default: 'LiveExample',
    generate: {
      combineArgs: {
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
    darkMode: false,
    label: 'Label',
    description: 'Description',
    children: 'npm install @leafygreen-ui/copyable',
  },
  argTypes: {
    copyable: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    children: storybookArgTypes.children,
    darkMode: storybookArgTypes.darkMode,
  },
};

export default meta;

export const LiveExample: StoryType<typeof Copyable> = args => (
  <div>
    <Copyable {...args} />
  </div>
);

LiveExample.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Generated = () => {};
