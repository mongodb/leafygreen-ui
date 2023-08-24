import React from 'react';
import { StoryFn, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { StoryMetaType } from '@leafygreen-ui/lib';
import { Size } from '@leafygreen-ui/tokens';

import {
  DatePickerContextProps,
  DatePickerProvider,
} from '../DatePickerContext';

import { DateInputSegment } from './DateInputSegment';

const meta: StoryMetaType<typeof DateInputSegment, DatePickerContextProps> = {
  title: 'Components/DatePicker/DateInputSegment',
  component: DateInputSegment,
  parameters: {
    default: null,
    generate: {
      combineArgs: {
        darkMode: [false, true],
        value: [undefined, 6, 2023],
        segment: ['day', 'month', 'year'],
        size: Object.values(Size),
      },
      decorator: (Instance, ctx) => (
        <DatePickerProvider value={{ size: ctx?.args.size }}>
          <Instance />
        </DatePickerProvider>
      ),
      excludeCombinations: [
        {
          value: 6,
          segment: 'year',
        },
        {
          value: 2023,
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

export const Type: StoryObj<typeof DateInputSegment> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('spinbutton');
    await userEvent.type(input, '12');
  },
};

export const ArrowUp: StoryObj<typeof DateInputSegment> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('spinbutton');
    input.focus();
    await userEvent.type(input, '{arrowup}');
  },
};

export const Generated = () => {};
