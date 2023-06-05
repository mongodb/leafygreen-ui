import React from 'react';
import { StoryFn } from '@storybook/react';

import { storybookArgTypes } from '@leafygreen-ui/lib';

import { Size } from './Skeleton/Skeleton.types';
import { CardSkeleton } from './CardSkeleton';
import { FormSkeleton } from './FormSkeleton';
import { ParagraphSkeleton } from './ParagraphSkeleton';
import { TableSkeleton } from './TableSkeleton';
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

export const Form: StoryFn<typeof FormSkeleton> = props => (
  <FormSkeleton {...props} />
);

export const TableWithoutLabels: StoryFn<typeof TableSkeleton> = props => (
  <TableSkeleton {...props} />
);
TableWithoutLabels.args = {
  numCols: 4,
};

export const TableWithLabels: StoryFn<typeof TableSkeleton> = props => (
  <TableSkeleton {...props} />
);
TableWithLabels.args = {
  numCols: 4,
  columnLabels: ['Column 1', 'Column 2', 'Column 3', ''],
};
