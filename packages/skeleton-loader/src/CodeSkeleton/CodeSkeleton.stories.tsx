import React from 'react';
import { StoryMetaType, StoryType } from '@lg-tools/storybook-utils';

import { CodeSkeleton } from '..';

export default {
  title: 'Components/SkeletonLoader',
  component: CodeSkeleton,
  parameters: {
    default: null,
    controls: { exclude: ['darkMode', 'ref'] },
    generate: {
      storyNames: ['Code'],
      combineArgs: {
        darkMode: [false, true],
      },
      decorator: Instance => (
        <div style={{ width: 500 }}>
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
} satisfies StoryMetaType<typeof CodeSkeleton>;

export const Code: StoryType<typeof CodeSkeleton> = () => <></>;
