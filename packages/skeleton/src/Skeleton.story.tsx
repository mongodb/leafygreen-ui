import React from 'react';
import { StoryFn } from '@storybook/react';

import { storybookArgTypes } from '@leafygreen-ui/lib';

import {
  CardSkeleton,
  FormSkeleton,
  ParagraphSkeleton,
  Size,
  Skeleton,
  TableSkeleton,
} from '.';

export default {
  title: 'Components/Skeleton',
  component: Skeleton,
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
  decorators: [
    (Story: StoryFn) => (
      <div style={{ width: 700 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    default: 'Paragraph',
  },
};

export const Basic: StoryFn<typeof Skeleton> = props => <Skeleton {...props} />;
Basic.argTypes = {
  size: {
    control: 'select',
    options: Object.values(Size),
    defaultValue: Size.Default,
  },
};

export const Paragraph: StoryFn<typeof ParagraphSkeleton> = props => (
  <ParagraphSkeleton {...props} />
);
Paragraph.argTypes = {
  withHeader: { control: 'boolean' },
};

export const Card: StoryFn<typeof CardSkeleton> = props => (
  <CardSkeleton {...props} />
);

export const Form: StoryFn<typeof FormSkeleton> = props => (
  <FormSkeleton {...props} />
);

const TableTemplate: StoryFn<typeof TableSkeleton> = props => (
  <TableSkeleton {...props} />
);
TableTemplate.argTypes = {
  columnLabels: { control: 'none' },
};

export const TableWithoutLabels: StoryFn<typeof TableSkeleton> =
  TableTemplate.bind({});

export const TableWithLabels: StoryFn<typeof TableSkeleton> =
  TableTemplate.bind({});
TableWithLabels.args = {
  columnLabels: ['Column 1', 'Column 2', 'Column 3', ''],
};
