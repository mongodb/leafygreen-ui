/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { StoryFn } from '@storybook/react';
import { isValid } from 'date-fns';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { StoryMetaType, StoryType } from '@leafygreen-ui/lib';
import { Size } from '@leafygreen-ui/tokens';

import {
  DatePickerContextProps,
  DatePickerProvider,
} from '../../DatePickerContext';

import { DateInputBox } from './DateInputBox';

const testDate = new Date(Date.UTC(1993, 12, 26));

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

const meta: StoryMetaType<typeof DateInputBox, DatePickerContextProps> = {
  title: 'Components/DatePicker/DateInputBox',
  component: DateInputBox,
  decorators: [ProviderWrapper],
  parameters: {
    default: null,
    generate: {
      storyNames: ['Formats', 'TimeZones'],
      combineArgs: {
        darkMode: [false, true],
        value: [null, testDate],
      },
      decorator: ProviderWrapper,
    },
  },
  args: {
    label: 'Label',
    dateFormat: 'en-UK',
    timeZone: 'Europe/London',
  },
  argTypes: {
    value: { control: 'date' },
  },
};

export default meta;

export const Basic: StoryFn<typeof DateInputBox> = props => {
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    if (props.value && isValid(new Date(props.value))) {
      setDate(new Date(props.value));
    }
  }, [props.value]);

  const updateDate = (date: Date | null) => {
    setDate(date);
  };

  return (
    <>
      <DateInputBox {...props} value={date} setValue={updateDate} />
    </>
  );
};

export const Formats: StoryType<
  typeof DateInputBox,
  DatePickerContextProps
> = () => <></>;
Formats.parameters = {
  generate: {
    combineArgs: {
      dateFormat: ['iso8601', 'en-US', 'en-UK', 'de-DE'],
    },
  },
};

export const TimeZones: StoryType<
  typeof DateInputBox,
  DatePickerContextProps
> = () => <></>;
TimeZones.parameters = {
  generate: {
    args: {
      dateFormat: 'iso8601',
      size: Size.Default,
    },
    combineArgs: {
      timeZone: [
        'Pacific/Honolulu',
        'America/Los_Angeles',
        'America/New_York',
        'Europe/London',
        'Asia/Istanbul',
        'Asia/Seoul',
        'Pacific/Auckland',
      ],
    },
    excludeCombinations: [{ value: null }, {}],
  },
};
