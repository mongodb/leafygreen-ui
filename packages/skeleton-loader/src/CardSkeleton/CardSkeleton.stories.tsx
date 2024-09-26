import React from 'react';
import { StoryMetaType, StoryType } from '@lg-tools/storybook-utils';

import { CardSkeleton } from '..';

const meta: StoryMetaType<typeof CardSkeleton> = {
  title: 'Components/SkeletonLoader',
  component: CardSkeleton,
  parameters: {
    default: null,
    controls: { exclude: ['darkMode', 'ref'] },
    generate: {
      storyNames: ['Card'],
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
};

export default meta;

export const Card: StoryType<typeof CardSkeleton> = () => <></>;
