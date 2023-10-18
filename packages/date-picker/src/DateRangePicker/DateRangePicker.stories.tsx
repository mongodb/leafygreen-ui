/* eslint-disable no-console */
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
import { DatePickerState, DateRangeType } from '../types';
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
        'onRangeChange',
        'onCancel',
        'onClear',
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
    console.log('Storybook: Range changed', range);
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

export const WithValidation: StoryFn<typeof DateRangePicker> = props => {
  const expectedDate = newUTC(2023, Month.December, 26);

  const [state, setState] = useState<DatePickerState>(DatePickerState.None);
  const [range, setRange] = useState<DateRangeType | undefined>([null, null]);

  const handleRangeChange = (range?: DateRangeType) => {
    console.log('Storybook: Range changed', range);
    setRange(range);
  };

  const handleValidation = (range?: DateRangeType) => {
    console.log('Storybook: Handling validation', range);

    if (range && range[0] === expectedDate) {
      setState(DatePickerState.None);
    }
    setState(DatePickerState.Error);
  };

  return (
    <DateRangePicker
      {...props}
      value={range}
      state={state}
      errorMessage={`Start date must be ${expectedDate.toUTCString()}`}
      onRangeChange={handleRangeChange}
      handleValidation={handleValidation}
    />
  );
};

// export const Generated = () => {};
