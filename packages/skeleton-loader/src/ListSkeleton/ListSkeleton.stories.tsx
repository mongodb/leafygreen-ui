import React from 'react';
import { StoryMetaType, StoryType } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { ListSkeleton } from '.';

const meta: StoryMetaType<typeof ListSkeleton> = {
  title: 'Components/SkeletonLoader',
  component: ListSkeleton,
  parameters: {
    default: null,
    controls: { exclude: ['darkMode', 'ref', 'size'] },
    generate: {
      storyNames: ['List'],
      combineArgs: {
        darkMode: [false, true],
        bulletsOnly: [false, true],
      },
      decorator: (Instance: StoryFn) => (
        <div style={{ width: 256 }}>
          <Instance />
        </div>
      ),
    },
  },
  args: {
    enableAnimations: false,
    count: 5,
  },
  argTypes: {
    enableAnimations: { control: 'boolean' },
    count: { control: 'number' },
  },
};

export default meta;

export const List: StoryType<typeof ListSkeleton> = () => <></>;
