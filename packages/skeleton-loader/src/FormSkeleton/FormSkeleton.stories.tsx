import React from 'react';
import { StoryMetaType, StoryType } from '@lg-tools/storybook-utils';

import { FormSkeleton } from '.';

export default {
  title: 'Components/SkeletonLoader',
  component: FormSkeleton,
  parameters: {
    controls: { exclude: ['darkMode', 'ref'] },
    default: null,
    generate: {
      storyNames: ['Form'],
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
} satisfies StoryMetaType<typeof FormSkeleton>;

export const Form: StoryType<typeof FormSkeleton> = () => <></>;
