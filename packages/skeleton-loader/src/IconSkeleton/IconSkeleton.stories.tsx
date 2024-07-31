import React from 'react';
import { StoryMetaType, StoryType } from '@lg-tools/storybook-utils';

import { Size } from '@leafygreen-ui/icon';

import { IconSkeleton } from '.';

export default {
  title: 'Components/SkeletonLoader',
  component: IconSkeleton,
  parameters: {
    default: null,
    controls: { exclude: ['darkMode', 'ref', 'size'] },
    generate: {
      storyNames: ['Icon'],
      combineArgs: {
        darkMode: [false, true],
        size: Object.values(Size),
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
    size: Size.Default,
    darkMode: false,
  },
  argTypes: {
    enableAnimations: { control: 'boolean' },
  },
} satisfies StoryMetaType<typeof IconSkeleton>;

const Template: StoryType<typeof IconSkeleton> = props => (
  <IconSkeleton {...props} />
);

export const Icon = Template.bind({});
