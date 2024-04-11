import React from 'react';
import {StoryFn} from '@storybook/react'
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
} satisfies StoryMetaType<typeof FormSkeleton>;

export const Form: StoryType<typeof FormSkeleton> = () => <></>;
