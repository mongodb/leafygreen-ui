import React from 'react';
import { StoryFn } from '@storybook/react';

import { storybookArgTypes } from '@leafygreen-ui/lib';

import { Size } from './Skeleton/Skeleton.types';
import { CardSkeleton } from './CardSkeleton';
import { ParagraphSkeleton } from './ParagraphSkeleton';
import { Skeleton } from '.';

export default {
  title: 'Components/Skeleton',
  component: Skeleton,
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    size: {
      control: 'select',
      options: Object.values(Size),
      defaultValue: Size.Default,
    },
  },
  decorators: [
    (Story: StoryFn) => (
      <div style={{ width: 700 }}>
        <Story />
      </div>
    ),
  ],
};

const Template: StoryFn<typeof Skeleton> = props => <Skeleton {...props} />;

export const Basic = Template.bind({});

export const Paragraph: StoryFn<typeof ParagraphSkeleton> = props => (
  <ParagraphSkeleton {...props} />
);
Paragraph.argTypes = {
  withHeader: { control: 'boolean' },
};

export const Card: StoryFn<typeof CardSkeleton> = props => (
  <CardSkeleton {...props} />
);
