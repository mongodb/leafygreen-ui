import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';
import { isToday } from 'date-fns';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { StoryMetaType } from '@leafygreen-ui/lib';
import { InlineCode } from '@leafygreen-ui/typography';

import { Month, Months } from '../../constants';
import { Locales, TimeZones } from '../../DatePicker.testUtils';
import {
  DatePickerContextProps,
  DatePickerProvider,
} from '../../DatePickerContext';
import { CalendarCell } from '../CalendarCell/CalendarCell';

import { CalendarGrid } from './CalendarGrid';

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

const meta: StoryMetaType<typeof CalendarGrid, DatePickerContextProps> = {
  title: 'Components/DatePicker/CalendarGrid',
  component: CalendarGrid,
  parameters: {
    default: 'Demo',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        dateFormat: ['en-us', 'iso8601', 'en-UK', 'de', 'fa-AF'],
      },
      decorator: ProviderWrapper,
    },
  },
  decorators: [ProviderWrapper],
  args: {
    dateFormat: 'en-US',
    // timeZone: 'America/Los_Angeles',
    // timeZone: 'Europe/London',
    timeZone: 'UTC',
  },
  argTypes: {
    darkMode: { control: 'boolean' },
    dateFormat: {
      control: 'select',
      options: Locales,
    },
    timeZone: {
      control: 'select',
      options: TimeZones,
    },
  },
};

export default meta;

export const Demo: StoryFn<typeof CalendarGrid> = ({ ...props }) => {
  const [month] = useState(new Date(Date.UTC(2023, Month.August, 5)));

  const [hovered, setHovered] = useState<string | undefined>();

  const handleHover = (id?: string) => () => {
    setHovered(id);
  };

  return (
    <div>
      <InlineCode>
        <b>{Months[month.getMonth()].long}</b> <b>{month.toISOString()}</b>
      </InlineCode>
      <CalendarGrid
        {...props}
        month={month}
        onMouseLeave={handleHover(undefined)}
      >
        {(day, i) => (
          <CalendarCell
            key={i}
            isCurrent={!!(day && isToday(day))}
            isHighlighted={hovered ? hovered === day?.toISOString() : false}
            onMouseEnter={handleHover(day?.toISOString())}
            data-iso={day?.toISOString()}
          >
            {day?.getUTCDate()}
          </CalendarCell>
        )}
      </CalendarGrid>
    </div>
  );
};

export const Generated = () => {};
