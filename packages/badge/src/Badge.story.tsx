import React from 'react';
import { ComponentStory } from '@storybook/react';

import { StoryMeta } from '@leafygreen-ui/lib';

import Badge from './Badge/Badge';
import { Variant } from './Badge/types';

export default StoryMeta({
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    default: 'Basic',
    chromatic: {
      generate: {
        darkMode: [false, true],
        variant: Object.values(Variant),
      },
    },
  },
  args: {
    children: 'Badge',
  },
});

const Template: ComponentStory<typeof Badge> = args => <Badge {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  children: 'Badge',
};
