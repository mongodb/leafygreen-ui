import React from 'react';
import { StoryMetaType, StoryType } from '@lg-tools/storybook-utils';

import { ListSkeleton } from '.';

export default {
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
      decorator: Instance => (
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
} satisfies StoryMetaType<typeof ListSkeleton>;

export const List: StoryType<typeof ListSkeleton> = () => <></>;
