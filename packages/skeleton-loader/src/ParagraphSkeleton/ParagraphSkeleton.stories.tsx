import React from 'react';
import { StoryMetaType, StoryType } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { ParagraphSkeleton } from './ParagraphSkeleton';

export default {
  title: 'Components/SkeletonLoader',
  component: ParagraphSkeleton,
  parameters: {
    controls: { exclude: ['darkMode', 'ref'] },
    default: null,
    generate: {
      storyNames: ['Paragraph'],
      combineArgs: {
        darkMode: [false, true],
        withHeader: [true, false],
      },
      decorator: (Instance: StoryFn) => (
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
} satisfies StoryMetaType<typeof ParagraphSkeleton>;

export const Paragraph: StoryType<typeof ParagraphSkeleton> = () => <></>;
