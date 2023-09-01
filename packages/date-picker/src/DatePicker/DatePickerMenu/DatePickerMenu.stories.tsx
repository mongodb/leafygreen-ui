/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react';
import { StoryFn } from '@storybook/react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { StoryMetaType } from '@leafygreen-ui/lib';

import {
  DatePickerContextProps,
  DatePickerProvider,
} from '../../DatePickerContext';

import { DatePickerMenu } from './DatePickerMenu';

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

const meta: StoryMetaType<typeof DatePickerMenu, DatePickerContextProps> = {
  title: 'Components/DatePicker/DatePickerMenu',
  component: DatePickerMenu,
  decorators: [ProviderWrapper],
  parameters: {
    default: null,
    generate: {
      combineArgs: {
        darkMode: [false, true],
        value: [null, new Date('1993-12-26')],
        dateFormat: ['iso8601', 'en-US', 'en-UK', 'de-DE'],
        timeZone: ['UTC', 'Europe/London', 'America/New_York', 'Asia/Seoul'],
      },
      excludeCombinations: [
        {
          timeZone: ['Europe/London', 'America/New_York', 'Asia/Seoul'],
          value: null,
        },
      ],
      decorator: ProviderWrapper,
    },
  },
  args: {
    dateFormat: 'en-UK',
    timeZone: 'Europe/London',
    isOpen: true,
  },
  argTypes: {
    value: { control: 'date' },
  },
};

export default meta;

export const Basic: StoryFn<typeof DatePickerMenu> = props => {
  const [value, setValue] = useState<Date | null>(new Date('2023-09-11'));
  const [month, setMonth] = useState<Date>(new Date('2023-09-11'));

  const refEl = useRef<HTMLDivElement>(null);
  return (
    <>
      <div ref={refEl}>refEl</div>
      <DatePickerMenu
        refEl={refEl}
        {...props}
        value={value}
        month={month}
        onCellClick={setValue}
        onMonthChange={newMonth => setMonth(newMonth)}
      />
    </>
  );
};

export const Generated = () => {};
