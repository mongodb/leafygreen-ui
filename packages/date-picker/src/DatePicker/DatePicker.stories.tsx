/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { StoryMetaType } from '@leafygreen-ui/lib';

import { Locales, TimeZones } from '../DatePicker.testUtils';
import {
  DatePickerContextProps,
  DatePickerProvider,
} from '../DatePickerContext';

import { DatePicker } from './DatePicker';

const ProviderWrapper = (Story: StoryFn, ctx?: { args: any }) => (
  <LeafyGreenProvider darkMode={ctx?.args.darkMode}>
    <DatePickerProvider
      value={{
        ...ctx?.args,
      }}
    >
      <Story />
    </DatePickerProvider>
  </LeafyGreenProvider>
);

const meta: StoryMetaType<typeof DatePicker, DatePickerContextProps> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  decorators: [ProviderWrapper],
  parameters: {
    default: null,
    generate: {
      combineArgs: {
        darkMode: [false, true],
        value: [new Date('1993-12-26')],
        dateFormat: ['iso8601', 'en-US', 'en-UK', 'de-DE'],
        timeZone: ['UTC', 'Europe/London', 'America/New_York', 'Asia/Seoul'],
      },
      decorator: ProviderWrapper,
    },
  },
  args: {
    label: 'Pick a date',
    dateFormat: 'iso8601',
    timeZone: 'Europe/London',
    min: new Date('1996-10-14'),
    max: new Date('2026-10-14'),
  },
  argTypes: {
    value: { control: 'date' },
    dateFormat: { control: 'select', options: Locales },
    timeZone: { control: 'select', options: TimeZones },
    min: { control: 'date' },
    max: { control: 'date' },
  },
};

export default meta;

export const Basic: StoryFn<typeof DatePicker> = props => {
  const [value, setValue] = useState<Date | null | undefined>(
    new Date('2023-09-10T00:00:00.000Z'),
  );

  return <DatePicker {...props} value={value} onChange={setValue} />;
};

export const Generated = () => {};
