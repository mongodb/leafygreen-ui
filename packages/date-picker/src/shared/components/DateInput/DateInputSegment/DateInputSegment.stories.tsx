import React from 'react';
import { StoryFn } from '@storybook/react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { StoryMetaType } from '@leafygreen-ui/lib';
import { Size } from '@leafygreen-ui/tokens';

import {
  DatePickerContextProps,
  DatePickerProvider,
} from '../../DatePickerContext';

import { DateInputSegment } from './DateInputSegment';

const meta: StoryMetaType<typeof DateInputSegment, DatePickerContextProps> = {
  title: 'Components/DatePicker/Shared/DateInputSegment',
  component: DateInputSegment,
  parameters: {
    default: null,
    generate: {
      combineArgs: {
        darkMode: [false, true],
        value: [undefined, '6', '2023'],
        segment: ['day', 'month', 'year'],
        size: Object.values(Size),
      },
      decorator: (Instance, ctx) => (
        // @ts-expect-error - incomplete context value
        <DatePickerProvider value={{ size: ctx?.args.size }}>
          <Instance />
        </DatePickerProvider>
      ),
      excludeCombinations: [
        {
          value: '6',
          segment: 'year',
        },
        {
          value: '2023',
          segment: ['day', 'month'],
        },
      ],
    },
  },
  args: {
    segment: 'day',
  },
  argTypes: {
    segment: {
      control: 'select',
      options: ['day', 'month', 'year'],
    },
  },
};

export default meta;

const Template: StoryFn<typeof DateInputSegment> = props => (
  <LeafyGreenProvider>
    <DateInputSegment {...props} />
  </LeafyGreenProvider>
);

export const Basic = Template.bind({});

export const Generated = () => {};
