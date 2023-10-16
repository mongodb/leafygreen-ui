/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Decorator, StoryFn } from '@storybook/react';
import { mockDateDecorator } from 'storybook-mock-date-decorator';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { StoryMetaType } from '@leafygreen-ui/lib';
import { Size } from '@leafygreen-ui/tokens';

import { Month } from '../constants';
import {
  DatePickerContextProps,
  DatePickerProvider,
} from '../DatePickerContext';
import {
  getProviderPropsFromStoryContext,
  Locales,
  TimeZones,
} from '../testUtils';
import { DateRangeType } from '../types';
import { newUTC } from '../utils';

import { DateRangePicker } from './DateRangePicker';

const ProviderWrapper: Decorator = (Story, ctx) => {
  const { leafyGreenProviderProps, datePickerProviderProps, storyProps } =
    getProviderPropsFromStoryContext(ctx);

  return (
    <LeafyGreenProvider {...leafyGreenProviderProps}>
      <DatePickerProvider
        value={{
          ...datePickerProviderProps,
        }}
      >
        <Story {...storyProps} />
      </DatePickerProvider>
    </LeafyGreenProvider>
  );
};

const mockToday = newUTC(2023, Month.September, 14);

const meta: StoryMetaType<typeof DateRangePicker, DatePickerContextProps> = {
  title: 'Components/DatePicker/DateRangePicker',
  component: DateRangePicker,
  decorators: [mockDateDecorator, ProviderWrapper],
  parameters: {
    default: null,
    date: mockToday,
    controls: {
      exclude: [
        'handleValidation',
        'initialValue',
        'onChange',
        'onSegmentChange',
        'value',
      ],
    },
  },
  args: {
    dateFormat: 'en-US',
    label: 'Pick a Range',
    description: 'Coordinated Universal Time',
    min: newUTC(1996, Month.October, 14),
    max: newUTC(2026, Month.October, 14),
    size: Size.Default,
    timeZone: 'America/New_York',
  },
  argTypes: {
    baseFontSize: { control: 'select' },
    dateFormat: { control: 'select', options: Locales },
    description: { control: 'text' },
    label: { control: 'text' },
    min: { control: 'date' },
    max: { control: 'date' },
    size: { control: 'select' },
    state: { control: 'select' },
    timeZone: { control: 'select', options: TimeZones },
  },
};

export default meta;

export const Basic: StoryFn<typeof DateRangePicker> = props => {
  const [range, setRange] = useState<DateRangeType | undefined>([
    newUTC(2023, Month.October, 14),
    newUTC(2023, Month.December, 26),
  ]);

  const handleRangeChange = (range?: DateRangeType) => {
    setRange(range);
  };

  return (
    <DateRangePicker
      {...props}
      value={range}
      onRangeChange={handleRangeChange}
    />
  );
};

export const WithQuickSelection: StoryFn<typeof DateRangePicker> = props => {
  const [range, setRange] = useState<DateRangeType | undefined>([
    newUTC(2023, Month.October, 14),
    newUTC(2023, Month.December, 26),
  ]);

  return (
    <DateRangePicker
      {...props}
      value={range}
      onRangeChange={setRange}
      showQuickSelection
    />
  );
};

export const Uncontrolled: StoryFn<typeof DateRangePicker> = props => {
  return <DateRangePicker {...props} />;
};

// export const Generated = () => {};
