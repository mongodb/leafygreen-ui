import React from 'react';
import { StoryMetaType, StoryType } from '@lg-tools/storybook-utils';

import { Size, Skeleton } from '.';

export default {
  title: 'Components/SkeletonLoader',
  component: Skeleton,
  parameters: {
    controls: { exclude: ['darkMode', 'ref', 'size'] },
    default: null,
    generate: {
      storyNames: ['Basic'],
      combineArgs: {
        darkMode: [false, true],
        size: Object.values(Size),
      },
      args: {
        enableAnimations: false,
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
  },
  argTypes: {
    enableAnimations: { control: 'boolean' },
  },
} satisfies StoryMetaType<typeof Skeleton>;

export const Basic: StoryType<typeof Skeleton> = () => <></>;
